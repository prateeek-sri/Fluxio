import { readNpmManifest } from "./npmReader.js";
import { readMavenManifest } from "./mavenReader.js";
import { readGradleManifest } from "./gradleReader.js";
import { readPipManifest } from "./pipReader.js";
import { readComposerManifest } from "./composerReader.js";
import { readGoManifest } from "./goReader.js";
import { readCargoManifest } from "./cargoReader.js";

/**
 * MANIFEST_READERS
 *
 * Maps the reader key (from DEPENDENCY_MANIFESTS) to the
 * function that reads and normalises that manifest format.
 *
 * Every reader must return:
 * {
 *   packageManager: string,
 *   dependencies:         { [name]: version },
 *   devDependencies:      { [name]: version },
 *   peerDependencies:     { [name]: version },
 *   optionalDependencies: { [name]: version },
 * }
 */
export const MANIFEST_READERS = Object.freeze({
  npm: readNpmManifest,
  maven: readMavenManifest,
  gradle: readGradleManifest,
  pip: readPipManifest,
  composer: readComposerManifest,
  go: readGoManifest,
  cargo: readCargoManifest,
});
