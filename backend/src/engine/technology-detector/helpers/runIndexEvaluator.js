import { findPatternMatches } from "./findPatternMatches.js";
import { createEvaluationResult } from "./createEvaluationResult.js";

export function runIndexEvaluator({
  index,

  rule,

  mapOccurrenceToEvidence,
}) {
  const {
    matched,

    occurrences,

    matchedPatterns,
  } = findPatternMatches({
    index,

    patterns: rule.patterns,
  });

  const evidence = occurrences.map((occurrence) =>
    mapOccurrenceToEvidence({
      occurrence,

      matchedPatterns,
    }),
  );

  return createEvaluationResult({
    matched,

    score: matched ? rule.weight : 0,

    occurrences,

    evidence,

    metadata: {
      matchedPatterns,
    },
  });
}