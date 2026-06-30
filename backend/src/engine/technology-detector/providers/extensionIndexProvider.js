export function getExtensionIndex(context) {
  if (context.indexes.extensionIndex) {
    return context.indexes.extensionIndex;
  }

  const extensionIndex = new Map();

  for (const file of context.repository.files) {
    if (!file.extension) {
      continue;
    }
    const extension = file.extension;

    if (!extensionIndex.has(extension)) {
      extensionIndex.set(extension, []);
    }

    extensionIndex.get(extension).push(file);
  }

  context.indexes.extensionIndex = extensionIndex;

  return extensionIndex;
}
