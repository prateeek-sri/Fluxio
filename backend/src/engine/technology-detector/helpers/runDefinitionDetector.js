import { EVALUATORS } from "../evaluators/index.js";
import { createDetection } from "./detectionFactory.js";
import { calculateConfidence } from "./confidenceCalculator.js";
import { mergeEvaluationResult } from "./mergeEvaluationResult.js";

/**
 * runDefinitionDetector
 *
 * Generic detection engine that evaluates definitions against indexes.
 *
 * Each definition declares:
 *   - rules:   what evidence to look for
 *   - storage: where to store the result (dot-path into technologies)
 *
 * The detector that calls this function does NOT know storage details.
 * Storage is resolved generically from definition.storage.
 *
 * This makes every detector identical — just pass definitions.
 */
export async function runDefinitionDetector({
  context,
  definitions,
}) {
  for (const definition of definitions) {
    const aggregation = {
      totalScore: 0,

      matchedRules: 0,

      evidence: [],

      metadata: {},

      warnings: [],
    };

    for (const rule of definition.rules) {
      const evaluator =
        EVALUATORS[rule.type];

      if (!evaluator) {
        aggregation.warnings.push(
          `No evaluator registered for "${rule.type}".`,
        );

        continue;
      }

      try {
        const evaluationResult =
          await evaluator({
            context,
            rule,
            definition,
          });

        mergeEvaluationResult({
          aggregation,
          evaluationResult,
        });
      } catch (error) {
        const warning =
          `${definition.name}: ${error.message}`;

        aggregation.warnings.push(warning);

        context.repository.metadata.warnings.push({
          detector: definition.name,

          ruleType: rule.type,

          message: error.message,

          timestamp: new Date(),
        });
      }
    }

    const confidence =
      calculateConfidence({
        totalScore:
          aggregation.totalScore,

        matchedRules:
          aggregation.matchedRules,

        totalRules:
          definition.rules.length,

        definition,
      });

    if (
      confidence <
      definition.minimumConfidence
    ) {
      continue;
    }

    const detection =
      createDetection({
        name: definition.name,

        confidence,

        evidence:
          aggregation.evidence,

        metadata:
          aggregation.metadata,

        warnings:
          aggregation.warnings,

        statistics: {
          matchedRules:
            aggregation.matchedRules,

          totalRules:
            definition.rules.length,
        },
      });

    // Generic storage routing — resolve dot-path from definition.storage
    const store = resolveStorage(context, definition.storage);
    store.set(detection.name, detection);
  }
}

/**
 * resolveStorage
 *
 * Resolves a dot-separated storage path into the target Map
 * within context.repository.technologies.
 *
 * Examples:
 *   "frameworks.backend"  →  context.repository.technologies.frameworks.backend
 *   "frameworks.frontend" →  context.repository.technologies.frameworks.frontend
 *   "orms"                →  context.repository.technologies.orms
 *   "databases"           →  context.repository.technologies.databases
 *   "buildTools"          →  context.repository.technologies.buildTools
 *   "deployment"          →  context.repository.technologies.deployment
 */
function resolveStorage(context, storagePath) {
  const parts = storagePath.split(".");
  let target = context.repository.technologies;

  for (const part of parts) {
    target = target[part];
  }

  return target;
}