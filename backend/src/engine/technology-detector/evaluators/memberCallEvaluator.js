import { getMemberCallIndex } from "../providers/memberCallIndexProvider.js";
import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createEvidence } from "../helpers/createEvidence.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";

/**
 * evaluateMemberCall
 *
 * Looks up rule patterns in the Member Call Index.
 * Patterns should be "object.method" strings.
 * Each match becomes a MEMBER_CALL evidence item.
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateMemberCall({ context, rule }) {
  const memberCallIndex = await getMemberCallIndex(context);

  return runIndexEvaluator({
    index: memberCallIndex,

    rule,

    mapOccurrenceToEvidence({ occurrence }) {
      return createEvidence({
        type: EVIDENCE_TYPES.MEMBER_CALL,

        value: occurrence.calledName,

        fileIds: occurrence.fileId ? [occurrence.fileId] : [],

        metadata: {
          objectName: occurrence.objectName,
          methodName: occurrence.methodName,
          line: occurrence.line,
        },
      });
    },
  });
}