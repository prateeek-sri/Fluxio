import {
  detectLanguage,
  detectPackageManager,
  detectRuntime,
} from "../detectors/index.js";
import { executeDetector } from "../utils/executeDetector.js";
import { inferEcosystems } from "../helpers/inferEcosystems.js";

/**
 * runPhaseOne
 *
 * Answers: "What facts can we observe directly?"
 *
 * Pipeline:
 *   Language Detector
 *         │
 *   Runtime Detector
 *         │
 *   Package Manager Detector
 *         │
 *   inferEcosystems()   ← derives knowledge, not a detector
 *
 * By the end of Phase One the context contains:
 *   - languages
 *   - runtimes
 *   - packageManagers
 *   - ecosystems
 *
 * These are facts, not guesses.
 * Phase Two uses ecosystems to filter definitions before detection.
 */
export async function runPhaseOne(context) {
  const startTime = Date.now();
  let durationMs = 0;
  let results = [];

  const detectors = [
    {
      detector: detectLanguage,
      detectorName: "languageDetector",
    },
    {
      detector: detectRuntime,
      detectorName: "runtimeDetector",
    },
    {
      detector: detectPackageManager,
      detectorName: "packageManagerDetector",
    },
  ];

  try {
    results = await Promise.all(
      detectors.map((detectorConfig) =>
        executeDetector({ ...detectorConfig, context }),
      ),
    );

    // Derive ecosystems from detected runtimes.
    // This is not a detector — it reads already-known facts.
    inferEcosystems(context);
  } finally {
    durationMs = Date.now() - startTime;
  }

  return {
    phase: "phaseOne",
    durationMs,
    detectors: results,
  };
}
