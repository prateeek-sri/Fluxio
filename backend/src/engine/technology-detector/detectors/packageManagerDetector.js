import { PACKAGE_MANAGER_DEFINITIONS } from "../definitions/packageManagers.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";
import { getFileNameIndex } from "../providers/fileNameIndexProvider.js";

export async function detectPackageManager(context) {
  const fileNameIndex = getFileNameIndex(context);
  const packageManagers = context.repository.technologies.packageManagers;

  for (const [fileName, files] of fileNameIndex) {
    const packageManager = PACKAGE_MANAGER_DEFINITIONS.get(fileName);

    if (!packageManager) {
      continue;
    }

    const fileIds = files.map((file) => file.id);

    if (!packageManagers.has(packageManager)) {
      const confidence = 100;

      const packageManagerDetection = {
        name: packageManager,
        confidence,
        evidence: [
          {
            type: EVIDENCE_TYPES.FILE,
            value: fileName,
            fileIds,
          },
        ],
        metadata: {},
      };

      packageManagers.set(
        packageManager,
        packageManagerDetection,
      );

      continue;
    }

    const packageManagerDetection =
      packageManagers.get(packageManager);

    packageManagerDetection.evidence.push({
      type: EVIDENCE_TYPES.FILE,
      value: fileName,
      fileIds,
    });
  }
}