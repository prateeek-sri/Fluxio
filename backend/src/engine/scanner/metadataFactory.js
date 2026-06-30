import crypto from "crypto";

function createBaseMetadata(data) {
  return {
    id: crypto.randomUUID(),

    name: data.name,

    absolutePath: data.absolutePath,
    relativePath: data.relativePath,
    parentFolder: data.parentFolder,

    depth: data.depth,

    createdAt: data.createdAt,
    modifiedAt: data.modifiedAt,
  };
}

export function createFileMetadata(data) {
  return {
    ...createBaseMetadata(data),

    type: "file",

    extension: data.extension,
    size: data.size,
  };
}

export function createFolderMetadata(data) {
  return {
    ...createBaseMetadata(data),

    type: "folder",
  };
}