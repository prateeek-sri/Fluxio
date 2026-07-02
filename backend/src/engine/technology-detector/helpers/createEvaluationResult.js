export function createEvaluationResult({
  matched = false,

  score = 0,

  occurrences = [],

  evidence = [],

  metadata = {},

  warnings = [],
}) {
  return {
    matched,

    score,

    occurrences,

    evidence,

    metadata,

    warnings,
  };
}