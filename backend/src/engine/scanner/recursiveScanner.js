import fs from "fs/promises";
import path from "path";

import {
  isIgnoredFolder,
  isIgnoredFile,
  isImportantFile,
  getExtension,
  getRelativePath,
} from "./scannerUtils.js";

import {
  createFileMetadata,
  createFolderMetadata,
} from "./metadataFactory.js";

export async function scanFolder({
  rootPath,
  currentPath,
  projectIndex,
  depth,
}) {
  try {
    let items = await fs.readdir(currentPath, {
      withFileTypes: true,
    });

    items.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    for (const item of items) {
      const isDirectory = item.isDirectory();
      const isFile = item.isFile();

      if (isDirectory && isIgnoredFolder(item.name)) {
        continue;
      }

      if (isFile && isIgnoredFile(item.name)) {
        continue;
      }

      const absolutePath = path.join(currentPath, item.name);

      const relativePath = getRelativePath(
        rootPath,
        absolutePath
      );

      const parentFolder = path.basename(
        path.dirname(absolutePath)
      );

      const stats = await fs.stat(absolutePath);

      const commonMetadata = {
        absolutePath,
        relativePath,
        parentFolder,

        depth: depth + 1,

        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
      };

      if (isDirectory) {
        const folderMetadata =
          createFolderMetadata({
            name: item.name,
            ...commonMetadata,
          });

        projectIndex.folders.set(
          folderMetadata.relativePath,
          folderMetadata
        );

        projectIndex.idIndex.set(
          folderMetadata.id,
          folderMetadata
        );

        projectIndex.metadata.totalFolders++;

        await scanFolder({
          rootPath,

          currentPath: absolutePath,

          projectIndex,

          depth: depth + 1,
        });
      } else if (isFile) {
        const extension = getExtension(item.name);

        const fileMetadata =
          createFileMetadata({
            name: item.name,
            extension,
            size: stats.size,
            ...commonMetadata,
          });

        projectIndex.files.set(
          fileMetadata.relativePath,
          fileMetadata
        );

        projectIndex.idIndex.set(
          fileMetadata.id,
          fileMetadata
        );

        projectIndex.metadata.totalFiles++;

        // Populate importantFiles index for fast manifest lookup
        if (isImportantFile(item.name)) {
          if (!projectIndex.importantFiles.has(item.name)) {
            projectIndex.importantFiles.set(item.name, []);
          }
          projectIndex.importantFiles.get(item.name).push(fileMetadata);
        }
      }
    }
  } catch (error) {
    console.error(
      `Failed to scan folder: ${currentPath}`,
      error
    );

    projectIndex.metadata.errors.push({
      stage: "recursiveScanner",
      path: currentPath,
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    });
  }
}