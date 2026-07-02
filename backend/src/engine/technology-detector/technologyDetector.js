import { runPhaseOne } from "./phases/phaseOne.js";
import { runPhaseTwo } from "./phases/phaseTwo.js";
import { runPhaseThree } from "./phases/phaseThree.js";
import { createDetectionContext } from "./detectionContext.js";

/**
 * runTechnologyDetector
 *
 * Entry point for the Technology Detector subsystem.
 *
 * Pipeline:
 *   ProjectIndex
 *       │
 *       ▼
 *   DetectionContext  (shared working memory)
 *       │
 *       ▼
 *   Phase One         (languages, runtimes, package managers, ecosystems)
 *       │
 *       ▼
 *   Phase Two         (frameworks, ORMs, databases)
 *       │
 *       ▼
 *   Phase Three       (conflict resolution, technology graph, report)
 *       │
 *       ▼
 *   DetectionResult
 */
export async function runTechnologyDetector(projectIndex) {
  const startTime = Date.now();
  let durationMs = 0;
  let context = null;
  let phaseOne = null;
  let phaseTwo = null;
  let phaseThree = null;

  try {
    context = createDetectionContext(projectIndex);

    phaseOne = await runPhaseOne(context);
    phaseTwo = await runPhaseTwo(context);
    phaseThree = await runPhaseThree(context);
  } finally {
    durationMs = Date.now() - startTime;
  }

  const phases = [phaseOne, phaseTwo, phaseThree];

  return {
    repository: context.repository,

    // The Technology Graph built in Phase 3
    technologyGraph: context.technologyGraph ?? null,

    // The fully serialisable detection report (no Maps)
    detectionReport: context.detectionReport ?? null,

    execution: {
      durationMs,
      phases,
    },
  };
}
