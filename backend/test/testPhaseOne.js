import { createProjectIndex } from "../src/engine/scanner/projectIndex.js";
import { scanFolder } from "../src/engine/scanner/recursiveScanner.js";
import { runTechnologyDetector } from "../src/engine/technology-detector/technologyDetector.js";

const projectPath =
  "X:\\Web Development\\MERN\\Backend\\Post Project";

console.clear();

console.log("============================================================");
console.log("              TECHNOLOGY DETECTOR TEST");
console.log("============================================================\n");

console.log("Scanning Repository...\n");

const projectIndex = createProjectIndex(projectPath);

projectIndex.metadata.scanStartedAt = new Date();

const scanStartTime = Date.now();

await scanFolder({
  rootPath: projectPath,
  currentPath: projectPath,
  projectIndex,
  depth: 0,
});

projectIndex.metadata.scanCompletedAt = new Date();
projectIndex.metadata.scanDurationMs = Date.now() - scanStartTime;

console.log("Repository Summary");
console.log("------------------------------------------------------------");
console.log(`Root Path      : ${projectIndex.metadata.rootPath}`);
console.log(`Files          : ${projectIndex.files.size}`);
console.log(`Folders        : ${projectIndex.folders.size}`);
console.log(`ID Index       : ${projectIndex.idIndex.size}`);
console.log(
  `Scan Time      : ${projectIndex.metadata.scanDurationMs} ms`,
);
console.log(
  `Warnings       : ${projectIndex.metadata.warnings.length}`,
);
console.log(
  `Errors         : ${projectIndex.metadata.errors.length}`,
);

console.log("\nRunning Technology Detector...\n");

const result = await runTechnologyDetector(projectIndex);

function printEvidence(evidenceList) {
  for (const evidence of evidenceList) {
    console.log(`  Type   : ${evidence.type}`);
    console.log(`  Value  : ${evidence.value}`);

    if (evidence.fileIds) {
      console.log("  Files:");

      for (const fileId of evidence.fileIds) {
        const file = projectIndex.idIndex.get(fileId);

        console.log(`    • ${file.relativePath}`);
      }
    }

    console.log();
  }
}

console.log("\n============================================================");
console.log("LANGUAGES");
console.log("============================================================\n");

if (projectIndex.technologies.languages.size === 0) {
  console.log("No languages detected.\n");
} else {
  for (const language of projectIndex.technologies.languages.values()) {
    console.log(`Language   : ${language.name}`);
    console.log(`Confidence : ${language.confidence}%`);

    console.log("\nEvidence:");
    printEvidence(language.evidence);

    console.log(
      "------------------------------------------------------------\n",
    );
  }
}

console.log("\n============================================================");
console.log("RUNTIMES");
console.log("============================================================\n");

if (projectIndex.technologies.runtimes.size === 0) {
  console.log("No runtimes detected.\n");
} else {
  for (const runtime of projectIndex.technologies.runtimes.values()) {
    console.log(`Runtime    : ${runtime.name}`);
    console.log(`Confidence : ${runtime.confidence}%`);

    if (runtime.metadata.languages?.length) {
      console.log(
        `Languages  : ${runtime.metadata.languages.join(", ")}`,
      );
    }

    console.log("\nEvidence:");
    printEvidence(runtime.evidence);

    console.log(
      "------------------------------------------------------------\n",
    );
  }
}

console.log("\n============================================================");
console.log("PACKAGE MANAGERS");
console.log("============================================================\n");

if (projectIndex.technologies.packageManagers.size === 0) {
  console.log("No package managers detected.\n");
} else {
  for (const packageManager of projectIndex.technologies
    .packageManagers.values()) {
    console.log(`Package Manager : ${packageManager.name}`);
    console.log(
      `Confidence      : ${packageManager.confidence}%`,
    );

    console.log("\nEvidence:");
    printEvidence(packageManager.evidence);

    console.log(
      "------------------------------------------------------------\n",
    );
  }
}

console.log("\n============================================================");
console.log("EXECUTION SUMMARY");
console.log("============================================================\n");

console.log(
  `Total Duration : ${result.execution.durationMs} ms\n`,
);

for (const phase of result.execution.phases) {
  console.log(`${phase.phase}`);
  console.log(`Duration : ${phase.durationMs} ms`);

  for (const detector of phase.detectors) {
    const status = detector.success ? "SUCCESS" : "FAILED";
    console.log(
      `  ${detector.detector.padEnd(25)} ${status.padEnd(8)} ${detector.durationMs} ms`,
    );

    if (detector.error) {
      console.log(`      ${detector.error.message}`);
    }
  }
  console.log();
}

console.log("============================================================");
console.log("SCAN ERRORS");
console.log("============================================================\n");

if (projectIndex.metadata.errors.length === 0) {
  console.log("No scan errors.\n");
} else {
  console.dir(projectIndex.metadata.errors, {
    depth: null,
  });
}