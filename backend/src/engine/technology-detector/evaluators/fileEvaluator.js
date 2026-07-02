import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createEvidence } from "../helpers/createEvidence.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";
import { getFileNameIndex } from "../providers/fileNameIndexProvider.js";

/**
 * evaluateFile
 *
 * Checks whether files matching the rule patterns exist in the
 * repository.  Patterns are matched against file *names* (not paths).
 *
 * This is used for definitions like:
 *   { type: "file", patterns: ["Dockerfile", ".env"], weight: 50 }
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateFile({ context, rule }) {
  const fileNameIndex = getFileNameIndex(context);

  return runIndexEvaluator({
    index: fileNameIndex,

    rule,

    mapOccurrenceToEvidence({ occurrence }) {
      return createEvidence({
        type: EVIDENCE_TYPES.FILE,

        value: occurrence.name ?? occurrence.fileName,

        fileIds: occurrence.id ? [occurrence.id] : [],

        metadata: {
          relativePath: occurrence.relativePath,
        },
      });
    },
  });
}