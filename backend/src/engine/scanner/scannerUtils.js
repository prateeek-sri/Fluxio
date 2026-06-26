import path from "path";
import {
    IGNORE_FOLDERS,
    IGNORE_FILES,
    TEXT_FILE_EXTENSIONS,
    BINARY_FILE_EXTENSIONS
} from "./scannerConstants.js";

export function isIgnoredFolder(folderName) {
    return IGNORE_FOLDERS.includes(folderName);
}

export function isIgnoredFile(fileName) {
    return IGNORE_FILES.includes(fileName);
}

export function getExtension(fileName) {
    return path.extname(fileName).toLowerCase();
}

export function isTextFile(fileName) {
    return TEXT_FILE_EXTENSIONS.includes(getExtension(fileName));
}

export function isBinaryFile(fileName) {
    return BINARY_FILE_EXTENSIONS.includes(getExtension(fileName));
}

export function normalizePath(filePath) {
    return filePath.replace(/\\/g, "/");
}

export function getRelativePath(rootPath, absolutePath) {
    return normalizePath(path.relative(rootPath, absolutePath));
}