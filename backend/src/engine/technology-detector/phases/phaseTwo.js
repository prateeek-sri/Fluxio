import {
  detectFramework,
  detectORM,
  detectDatabase,
} from "../detectors/index.js";
import { executeDetector } from "../utils/executeDetector.js";

export async function runPhaseTwo(context) {
  const startTime = Date.now();
  let durationMs = 0;
  let results = [];

  const detectors = [
    {
      detector: detectFramework,
      detectorName: "frameworkDetector",
    },
    {
      detector: detectORM,
      detectorName: "ormDetector",
    },
    {
      detector: detectDatabase,
      detectorName: "databaseDetector",
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
    phase: "phaseTwo",
    durationMs,
    detectors: results,
  };
}