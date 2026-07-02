import { readFile } from "fs/promises";

/**
 * readMavenManifest
 *
 * Reads a pom.xml file and extracts <dependency> entries.
 * Returns a normalised manifest.
 *
 * NOTE: Uses lightweight regex-based parsing.
 *       A proper XML parser is the long-term replacement.
 */
export async function readMavenManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");

  const dependencies = {};

  // Match <dependency> blocks
  const depBlockRegex =
    /<dependency>([\s\S]*?)<\/dependency>/gm;

  let block;
  while ((block = depBlockRegex.exec(raw)) !== null) {
    const content = block[1];

    const groupId = extractTag(content, "groupId");
    const artifactId = extractTag(content, "artifactId");
    const version = extractTag(content, "version") ?? "*";
    const scope = extractTag(content, "scope") ?? "compile";

    if (!groupId || !artifactId) {
      continue;
    }

    // Use Maven coordinate format: groupId:artifactId
    const name = `${groupId}:${artifactId}`;

    dependencies[name] = version;

    // Suppress "test" scope from normal deps if needed
    // scope is available for future scope-based filtering
  }

  return {
    packageManager: "maven",
    dependencies,
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
  };
}

function extractTag(content, tag) {
  const regex = new RegExp(
    `<${tag}>([^<]*)</${tag}>`,
  );
  const match = regex.exec(content);
  return match ? match[1].trim() : null;
}
