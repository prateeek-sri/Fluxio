import { getImportIndex } from "../providers/importIndexProvider.js";
import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createEvidence } from "../helpers/createEvidence.js";
import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";

/**
 * evaluateImport
 *
 * Looks up rule patterns in the Import Index.
 * Each matched occurrence becomes an IMPORT evidence item.
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateImport({ context, rule }) {
  const importIndex = await getImportIndex(context);

  return runIndexEvaluator({
    index: importIndex,

    rule,

    mapOccurrenceToEvidence({ occurrence }) {
      return createEvidence({
        type: EVIDENCE_TYPES.IMPORT,

        value: occurrence.importedName,

        fileIds: occurrence.fileId ? [occurrence.fileId] : [],

        metadata: {
          alias: occurrence.alias,
          importType: occurrence.importType,
          line: occurrence.line,
        },
      });
    },
  });
}