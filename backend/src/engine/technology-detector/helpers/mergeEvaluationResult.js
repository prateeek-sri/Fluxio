export function mergeEvaluationResult({
  aggregation,
  evaluationResult,
}) {
  if (!evaluationResult.matched) {
    return;
  }

  aggregation.totalScore += evaluationResult.score;
  aggregation.matchedRules++;

  aggregation.evidence.push(
    ...evaluationResult.evidence,
  );

  Object.assign(
    aggregation.metadata,
    evaluationResult.metadata,
  );

  aggregation.warnings.push(
    ...evaluationResult.warnings,
  );
}