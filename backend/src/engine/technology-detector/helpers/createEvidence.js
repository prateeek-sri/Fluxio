/**
 * createEvidence
 *
 * Single factory for every evidence object in the system.
 * Every evaluator must create evidence through this function —
 * never by constructing a plain object directly.
 *
 * Shape:
 *   { type, value, fileIds, metadata }
 */
export function createEvidence({
  type,
  value,
  fileIds = [],
  metadata = {},
}) {
  return {
    type,
    value,
    fileIds,
    metadata,
  };
}
