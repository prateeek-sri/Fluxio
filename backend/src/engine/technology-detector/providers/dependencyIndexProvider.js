import { DEPENDENCY_MANIFESTS } from "../definitions/dependencyManifests.js";
import { DEPENDENCY_SOURCES } from "../definitions/dependencySources.js";
import { MANIFEST_READERS } from "../helpers/manifestReaders/index.js";
export async function getDependencyIndex(context) {
  if (context.indexes.dependencyIndex) {
    return context.indexes.dependencyIndex;
  }
  const dependencyIndex = new Map();
  try {
    for (const manifestDefinition of DEPENDENCY_MANIFESTS) {
      // Try importantFiles first (populated by scanner or test setup).
      // Fall back to scanning all files by name (real scanner compat).
      const manifestFiles =
        getManifestFiles(context, manifestDefinition.fileName);

      if (!manifestFiles || manifestFiles.length === 0) {
        continue;
      }
      const reader = MANIFEST_READERS[manifestDefinition.reader];
      if (!reader) {
        continue;
      }
      for (const manifestFile of manifestFiles) {
        try {
          const manifest = await reader(manifestFile);
          addDependencies(
            dependencyIndex,
            manifest.dependencies,
            DEPENDENCY_SOURCES.DEPENDENCY,
            manifest.packageManager,
            manifestFile.id,
          );
          addDependencies(
            dependencyIndex,
            manifest.devDependencies,
            DEPENDENCY_SOURCES.DEV_DEPENDENCY,
            manifest.packageManager,
            manifestFile.id,
          );
          addDependencies(
            dependencyIndex,
            manifest.peerDependencies,
            DEPENDENCY_SOURCES.PEER_DEPENDENCY,
            manifest.packageManager,
            manifestFile.id,
          );
          addDependencies(
            dependencyIndex,
            manifest.optionalDependencies,
            DEPENDENCY_SOURCES.OPTIONAL_DEPENDENCY,
            manifest.packageManager,
            manifestFile.id,
          );
        } catch (fileError) {
          context.repository.metadata.errors.push({
            stage: "dependencyIndexProvider",
            name: fileError.name,
            message: fileError.message,
            timestamp: new Date(),
          });
        }
      }
    }
    context.indexes.dependencyIndex = dependencyIndex;
    return dependencyIndex;
  } catch (error) {
    context.repository.metadata.errors.push({
      stage: "dependencyIndexProvider",
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    });
    context.indexes.dependencyIndex = dependencyIndex;
    return dependencyIndex;
  }
}

/**
 * getManifestFiles
 *
 * Tries importantFiles first (fast, used by test setup and future
 * scanner upgrade). Falls back to a full scan of files by name
 * when importantFiles isn't populated (current real scanner).
 */
function getManifestFiles(context, fileName) {
  // Primary: importantFiles index
  const fromImportant = context.repository.importantFiles?.get(fileName);
  if (fromImportant && fromImportant.length > 0) {
    return fromImportant;
  }

  // Fallback: search all files by name
  const results = [];
  for (const file of context.repository.files.values()) {
    if (file.name === fileName) {
      results.push(file);
    }
  }
  return results;
}
function addDependencies(
  dependencyIndex,
  dependencies,
  source,
  packageManager,
  fileId,
) {
  if (!dependencies || typeof dependencies !== "object") return;
  for (const [dependency, version] of Object.entries(dependencies)) {
    if (!dependencyIndex.has(dependency)) {
      dependencyIndex.set(dependency, []);
    }
    dependencyIndex
      .get(dependency)
      .push({ dependency, version, source, packageManager, fileId });
  }
}
