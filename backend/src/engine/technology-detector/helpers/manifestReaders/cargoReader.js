import { readFile } from "fs/promises";

/**
 * readCargoManifest
 *
 * Reads a Cargo.toml file and extracts Rust crate dependencies.
 *
 * Supports:
 *   [dependencies]
 *   serde = "1.0"
 *   serde = { version = "1.0", features = ["derive"] }
 *
 *   [dev-dependencies]
 *   tokio-test = "0.4"
 */
export async function readCargoManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");

  const dependencies = {};
  const devDependencies = {};

  parseSectionDeps(raw, "[dependencies]", "[", dependencies);
  parseSectionDeps(
    raw,
    "[dev-dependencies]",
    "[",
    devDependencies,
  );

  return {
    packageManager: "cargo",
    dependencies,
    devDependencies,
    peerDependencies: {},
    optionalDependencies: {},
  };
}

// ---------------------------------------------------------------------------

function parseSectionDeps(raw, sectionHeader, nextSectionChar, target) {
  const start = raw.indexOf(sectionHeader);
  if (start === -1) return;

  const afterHeader = start + sectionHeader.length;
  const nextSection = raw.indexOf(nextSectionChar, afterHeader);
  const block =
    nextSection === -1
      ? raw.slice(afterHeader)
      : raw.slice(afterHeader, nextSection);

  // Match:  crateName = "version"
  //         crateName = { version = "1.0" }
  const lineRegex =
    /^([\w-]+)\s*=\s*(?:"([^"]+)"|{[^}]*version\s*=\s*"([^"]+)"[^}]*})/gm;

  let m;
  while ((m = lineRegex.exec(block)) !== null) {
    const name = m[1];
    const version = m[2] ?? m[3] ?? "*";
    target[name] = version;
  }
}
