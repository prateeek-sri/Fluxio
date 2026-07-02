import { getDependencyIndex } from "../providers/dependencyIndexProvider.js";
import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createEvidence } from "../helpers/createEvidence.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";

/**
 * evaluateDependency
 *
 * Looks up rule patterns in the Dependency Index.
 * Each matched occurrence becomes a DEPENDENCY evidence item.
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateDependency({ context, rule }) {
  const dependencyIndex = await getDependencyIndex(context);

  return runIndexEvaluator({
    index: dependencyIndex,

    rule,

    mapOccurrenceToEvidence({ occurrence }) {
      return createEvidence({
        type: EVIDENCE_TYPES.DEPENDENCY,

        value: occurrence.dependency ?? occurrence.name,

        fileIds: occurrence.fileId ? [occurrence.fileId] : [],

        metadata: {
          version: occurrence.version,
          source: occurrence.source,
          packageManager: occurrence.packageManager,
        },
      });
    },
  });
}