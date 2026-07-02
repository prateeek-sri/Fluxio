export function calculateConfidence({
  totalScore,
  matchedRules,
  totalRules,
  definition,
}) {
  return Math.min(totalScore, 100);
}