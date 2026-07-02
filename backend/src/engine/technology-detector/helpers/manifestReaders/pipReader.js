import { readFile } from "fs/promises";

/**
 * readPipManifest
 *
 * Reads a requirements.txt or pyproject.toml file and extracts
 * Python package dependencies.
 *
 * requirements.txt format:
 *   django>=3.2
 *   flask==2.0.1
 *   requests
 *
 * pyproject.toml: reads [project].dependencies and
 *                 [project.optional-dependencies].dev arrays.
 */
export async function readPipManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");
  const isToml = file.name.endsWith(".toml");

  if (isToml) {
    return parsePyprojectToml(raw);
  }

  return parseRequirementsTxt(raw);
}

// ---------------------------------------------------------------------------

function parseRequirementsTxt(raw) {
  const dependencies = {};

  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith("-"));

  for (const line of lines) {
    // Package name is everything before the first version specifier
    const match = line.match(/^([A-Za-z0-9_.-]+)(.*)$/);
    if (!match) continue;

    const name = match[1].toLowerCase();
    const versionSpec = match[2].trim() || "*";

    dependencies[name] = versionSpec;
  }

  return {
    packageManager: "pip",
    dependencies,
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
  };
}

function parsePyprojectToml(raw) {
  const dependencies = {};
  const devDependencies = {};

  // [project] dependencies = [ "django>=3.2", ... ]
  const projDepMatch = raw.match(
    /\[project\][\s\S]*?^dependencies\s*=\s*\[([\s\S]*?)\]/m,
  );

  if (projDepMatch) {
    extractTomlDeps(projDepMatch[1], dependencies);
  }

  // [project.optional-dependencies] dev = [ ... ]
  const devMatch = raw.match(
    /\[project\.optional-dependencies\]([\s\S]*?)(?=\[|$)/m,
  );

  if (devMatch) {
    extractTomlDeps(devMatch[1], devDependencies);
  }

  return {
    packageManager: "pip",
    dependencies,
    devDependencies,
    peerDependencies: {},
    optionalDependencies: {},
  };
}

function extractTomlDeps(block, target) {
  const itemRegex = /["']([A-Za-z0-9_.-]+)([^"']*)?["']/g;
  let m;
  while ((m = itemRegex.exec(block)) !== null) {
    const name = m[1].toLowerCase();
    const version = m[2]?.trim() || "*";
    target[name] = version;
  }
}
