import { readFile } from "fs/promises";

/**
 * readGradleManifest
 *
 * Reads a build.gradle or build.gradle.kts file and extracts
 * dependency declarations.
 *
 * Supports:
 *   implementation 'group:artifact:version'
 *   implementation("group:artifact:version")
 *   testImplementation 'group:artifact:version'
 *
 * Returns a normalised manifest.
 */
export async function readGradleManifest(file) {
  const filePath = file.absolutePath ?? file.path;
  const raw = file.content ?? await readFile(filePath, "utf-8");

  const dependencies = {};
  const devDependencies = {};

  // Match Gradle dependency declarations
  const depRegex =
    /(\w+)\s*[('"]([^'"]+):([^'"]+):([^'"]+)['"]/gm;

  let match;
  while ((match = depRegex.exec(raw)) !== null) {
    const configuration = match[1]; // e.g. "implementation", "testImplementation"
    const groupId = match[2];
    const artifactId = match[3];
    const version = match[4].trim().replace(/['")\s]/g, "");

    const name = `${groupId}:${artifactId}`;

    const isTestConfig =
      configuration.startsWith("test") ||
      configuration.includes("Test");

    if (isTestConfig) {
      devDependencies[name] = version;
    } else {
      dependencies[name] = version;
    }
  }

  return {
    packageManager: "gradle",
    dependencies,
    devDependencies,
    peerDependencies: {},
    optionalDependencies: {},
  };
}
