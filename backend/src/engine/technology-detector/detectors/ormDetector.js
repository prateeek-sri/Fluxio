import { ORM_DEFINITIONS } from "../definitions/orms.js";
import { getApplicableDefinitions } from "../helpers/getApplicableDefinitions.js";
import { runDefinitionDetector } from "../helpers/runDefinitionDetector.js";

/**
 * detectORM
 *
 * Detects ORM and ODM libraries used in the repository.
 *
 * Uses the same generic detection engine as every other detector.
 * Adding new ORMs requires only a new entry in definitions/orms.js.
 */
export async function detectORM(context) {
  const definitions = getApplicableDefinitions(
    ORM_DEFINITIONS,
    context,
  );

  await runDefinitionDetector({ context, definitions });
}