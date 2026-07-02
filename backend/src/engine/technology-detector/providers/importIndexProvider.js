import { extractImports } from "../helpers/extractImports.js";

export async function getImportIndex(context) {
  if (context.indexes.importIndex) {
    return context.indexes.importIndex;
  }

  const importIndex = new Map();

  for (const file of context.repository.files.values()) {
    if (!file.content) {
      continue;
    }

    const imports = extractImports(file);

    for (const imported of imports) {
      if (
        !importIndex.has(imported.importedName)
      ) {
        importIndex.set(
          imported.importedName,
          [],
        );
      }

      importIndex
        .get(imported.importedName)
        .push({
          ...imported,

          fileId: file.id,
        });
    }
  }

  context.indexes.importIndex =
    importIndex;

  return importIndex;
}