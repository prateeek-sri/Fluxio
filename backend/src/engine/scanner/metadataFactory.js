import crypto from "crypto";

export function createFileMetadata({
    name,
    extension,
    absolutePath,
    relativePath,
    parentFolder,
    size,
    depth,
    createdAt,
    modifiedAt
}) {
    return {
        id: crypto.randomUUID(),

        kind: "file",

        name,

        extension,

        absolutePath,

        relativePath,

        parentFolder,

        size,

        depth,

        createdAt,

        modifiedAt,

        analyzed: false,

        tags: []
    };
}

export function createFolderMetadata({
    name,
    absolutePath,
    relativePath,
    parentFolder,
    depth,
    createdAt,
    modifiedAt
}) {
    return {
        id: crypto.randomUUID(),

        kind: "folder",

        name,

        absolutePath,

        relativePath,

        parentFolder,

        depth,

        createdAt,

        modifiedAt,

        analyzed: false,

        tags: []
    };
}