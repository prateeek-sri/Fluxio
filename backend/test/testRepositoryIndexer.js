import { indexRepository } from "../src/engine/scanner/index.js";

async function main() {
  // Change this to any local repository on your computer
  const repositoryPath = "X:\\Web Development\\Spring Boot\\LearningRESTAPIs";
console.log(repositoryPath);
  const projectIndex = await indexRepository(repositoryPath);

  console.log("\n========== Repository Scan Summary ==========\n");

  console.log("Total Files:", projectIndex.metadata.totalFiles);
  console.log("Total Folders:", projectIndex.metadata.totalFolders);

  console.log(
    "Total IDs:",
    projectIndex.idIndex.size
  );

  console.log(
    "Scan Duration:",
    projectIndex.metadata.scanDurationMs,
    "ms"
  );

  console.log(
    "Warnings:",
    projectIndex.metadata.warnings.length
  );

  console.log(
    "Errors:",
    projectIndex.metadata.errors.length
  );

  console.log("\n========== First 10 Files ==========\n");

  let count = 0;

  for (const file of projectIndex.files.values()) {
    console.log({
      name: file.name,
      relativePath: file.relativePath,
      extension: file.extension,
      depth: file.depth,
    });

    count++;

    if (count === 10) break;
  }

  console.log("\n========== First 10 Folders ==========\n");

  count = 0;

  for (const folder of projectIndex.folders.values()) {
    console.log({
      name: folder.name,
      relativePath: folder.relativePath,
      depth: folder.depth,
    });

    count++;

    if (count === 10) break;
  }

  if (projectIndex.metadata.errors.length > 0) {
    console.log("\n========== Errors ==========\n");
    console.table(projectIndex.metadata.errors);
  }

  console.log("\n=====================================\n");
}

main().catch(console.error);