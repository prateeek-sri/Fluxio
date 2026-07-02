import { readFile } from "fs/promises";

/**
 * readGoManifest
 *
 * Reads a go.mod file and extracts module requirements.
 *
 * go.mod format:
 *   require (
 *     github.com/gin-gonic/gin v1.9.0
 *     golang.org/x/net v0.10.0
 *   )
 */
export async function readGoManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");

  const dependencies = {};

  // Match require blocks:  require ( ... )
  const blockRegex = /require\s*\(([\s\S]*?)\)/gm;

  let block;
  while ((block = blockRegex.exec(raw)) !== null) {
    const lines = block[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      if (line.startsWith("//")) continue;

      const parts = line.split(/\s+/);
      if (parts.length < 2) continue;

      const [name, version] = parts;
      dependencies[name] = version;
    }
  }

  // Also match single-line:  require github.com/foo/bar v1.0.0
  const singleRegex = /^require\s+(\S+)\s+(\S+)/gm;
  let m;
  while ((m = singleRegex.exec(raw)) !== null) {
    dependencies[m[1]] = m[2];
  }

  return {
    packageManager: "go",
    dependencies,
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
  };
}
