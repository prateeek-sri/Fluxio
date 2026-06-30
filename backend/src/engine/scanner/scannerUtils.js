import path from "path";

import {
  IGNORED_FILES,
  IGNORED_FOLDERS,
  IMPORTANT_FILES,
  IMPORTANT_FOLDERS,
} from "./scannerConstants.js";

export function isIgnoredFolder(folderName) {
  return IGNORED_FOLDERS.includes(folderName);
}

export function isIgnoredFile(fileName) {
  return IGNORED_FILES.includes(fileName);
}

export function isImportantFile(fileName) {
  return IMPORTANT_FILES.includes(fileName);
}

export function isImportantFolder(folderName) {
  return IMPORTANT_FOLDERS.includes(folderName);
}

export function getExtension(fileName) {
  return path.extname(fileName).toLowerCase();
}

export function getRelativePath(rootPath, absolutePath) {
    return path
        .relative(rootPath, absolutePath)
        .replaceAll("\\", "/");
}