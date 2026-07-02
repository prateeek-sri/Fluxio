import { createEvaluationResult } from "../helpers/createEvaluationResult.js";

/**
 * evaluateConfiguration
 *
 * Evaluates configuration-based rules (e.g. checking for specific
 * keys inside config files like application.yml, .env, etc.).
 *
 * Current implementation: stub — returns no match.
 * Full implementation requires a Configuration Index that reads and
 * parses common config formats (YAML, TOML, .env, JSON).
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateConfiguration({ context, rule }) {
  // Configuration index is not yet built — skip without error.
  return createEvaluationResult({
    matched: false,
    score: 0,
    occurrences: [],
    evidence: [],
    metadata: { reason: "configurationIndexNotYetBuilt" },
    warnings: [],
  });
}