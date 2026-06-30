import {
  detectBuildTool,
  detectDeployment,
} from "../detectors/index.js";

import { executeDetector } from "../utils/executeDetector.js";

export async function runPhaseThree(context) {
  const startTime = Date.now();
  let durationMs = 0;
  let results = [];

  const detectors = [
    {
      detector: detectBuildTool,
      detectorName: "buildToolDetector",
    },
    {
      detector: detectDeployment,
      detectorName: "deploymentDetector",
    },
  ];

  try {
    results = await Promise.all(
      detectors.map(({ detector, detectorName }) =>
        executeDetector({
          detector,
          detectorName,
          context,
        }),
      ),
    );
  } finally {
    durationMs = Date.now() - startTime;
  }

  return {
    phase: "phaseThree",
    durationMs,
    detectors: results,
  };
}