/**
 * getApplicableDefinitions
 *
 * Filters definitions based on ecosystem detection.
 *
 * Two kinds of definitions:
 *   1. Global (no ecosystem field, or ecosystem === null)
 *      → Always run regardless of ecosystem inference.
 *      → Example: React doesn't need "Node.js" ecosystem to be detected.
 *
 *   2. Ecosystem-scoped (ecosystem === "Java", "Node.js", etc.)
 *      → Only run if that ecosystem was detected in Phase 1.
 *      → Example: Spring Boot only runs if Java ecosystem is present.
 *
 * This makes the detector resilient to ecosystem inference failures.
 * If ecosystem inference is wrong, global definitions still work.
 */
export function getApplicableDefinitions(definitions, context) {
  const ecosystems = context.repository.technologies.ecosystems;

  return definitions.filter((definition) => {
    // Global definition — no ecosystem restriction → always run
    if (!definition.ecosystem) {
      return true;
    }

    // Ecosystem-scoped → only run if that ecosystem was detected
    return ecosystems.has(definition.ecosystem);
  });
}
