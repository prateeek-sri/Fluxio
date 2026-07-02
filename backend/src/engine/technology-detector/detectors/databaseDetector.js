import { DATABASE_DEFINITIONS } from "../definitions/databases.js";
import { getApplicableDefinitions } from "../helpers/getApplicableDefinitions.js";
import { runDefinitionDetector } from "../helpers/runDefinitionDetector.js";

/**
 * detectDatabase
 *
 * Detects database clients and drivers used in the repository.
 *
 * Uses the same generic detection engine as every other detector.
 * Adding new databases requires only a new entry in definitions/databases.js.
 */
export async function detectDatabase(context) {
  const definitions = getApplicableDefinitions(
    DATABASE_DEFINITIONS,
    context,
  );

  await runDefinitionDetector({ context, definitions });
}