import { getFunctionCallIndex } from "../providers/functionCallIndexProvider.js";
import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createEvidence } from "../helpers/createEvidence.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";

/**
 * evaluateFunctionCall
 *
 * Looks up rule patterns in the Function Call Index.
 * Each matched call becomes a FUNCTION_CALL evidence item.
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateFunctionCall({ context, rule }) {
  const functionCallIndex = await getFunctionCallIndex(context);

  return runIndexEvaluator({
    index: functionCallIndex,

    rule,

    mapOccurrenceToEvidence({ occurrence }) {
      return createEvidence({
        type: EVIDENCE_TYPES.FUNCTION_CALL,

        value: occurrence.calledName,

        fileIds: occurrence.fileId ? [occurrence.fileId] : [],

        metadata: {
          line: occurrence.line,
        },
      });
    },
  });
}