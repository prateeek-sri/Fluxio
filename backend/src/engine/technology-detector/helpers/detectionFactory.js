export function createDetection({
  name,

  confidence = 0,

  evidence = [],

  metadata = {},

  warnings = [],

  statistics = {},
}) {
  return {
    name,

    confidence,

    evidence,

    metadata,

    warnings,

    statistics: {
      matchedRules: 0,
      totalRules: 0,

      ...statistics,
    },
  };
}