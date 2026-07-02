import { readFile } from "fs/promises";

/**
 * readNpmManifest
 *
 * Reads a package.json file and returns a normalised manifest.
 * The file object must have a `path` property (for disk reads)
 * or a `content` property (for in-memory / synthetic repos).
 */
export async function readNpmManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");
  const json = JSON.parse(raw);

  return {
    packageManager: "npm",
    dependencies: json.dependencies ?? {},
    devDependencies: json.devDependencies ?? {},
    peerDependencies: json.peerDependencies ?? {},
    optionalDependencies: json.optionalDependencies ?? {},
  };
}
