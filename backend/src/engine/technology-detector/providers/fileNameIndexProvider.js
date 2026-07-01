export function getFileNameIndex(context) {
    if(context.indexes.fileNameIndex) {
        return context.indexes.fileNameIndex;
    }

    const fileNameIndex = new Map();

    for (const file of context.repository.files.values()) {
        
        const fileName = file.name;

        if (!fileNameIndex.has(fileName)) {
            fileNameIndex.set(fileName, []);
        }

        fileNameIndex.get(fileName).push(file);
    }

    context.indexes.fileNameIndex = fileNameIndex;
    return fileNameIndex;
}