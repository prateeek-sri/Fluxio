import { createProjectIndex } from "./projectIndex.js";
import { scanFolder } from "./recursiveScanner.js";

export async function indexRepository(repositoryPath) {
  const projectIndex =
    createProjectIndex(repositoryPath);

  projectIndex.metadata.scanStartedAt =
    new Date();

  const startTime = Date.now();

  try {
    await scanFolder({
      rootPath: repositoryPath,

      currentPath: repositoryPath,

      projectIndex,

      depth: 0,
    });
  } catch (error) {
    console.error(
      "Repository indexing failed:",
      error
    );

    projectIndex.metadata.errors.push({
      stage: "repositoryIndexer",
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    });
  } finally {
    projectIndex.metadata.scanCompletedAt =
      new Date();

    projectIndex.metadata.scanDurationMs =
      Date.now() - startTime;
  }

  return projectIndex;
}