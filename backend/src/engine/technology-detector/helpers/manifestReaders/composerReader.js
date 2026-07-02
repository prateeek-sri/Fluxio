import { readFile } from "fs/promises";

/**
 * readComposerManifest
 *
 * Reads a composer.json file and returns a normalised manifest.
 */
export async function readComposerManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");
  const json = JSON.parse(raw);

  return {
    packageManager: "composer",
    dependencies: json.require ?? {},
    devDependencies: json["require-dev"] ?? {},
    peerDependencies: {},
    optionalDependencies: {},
  };
}
