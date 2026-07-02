import { FRAMEWORK_DEFINITIONS } from "../definitions/frameworks.js";
import { getApplicableDefinitions } from "../helpers/getApplicableDefinitions.js";
import { runDefinitionDetector } from "../helpers/runDefinitionDetector.js";

/**
 * detectFramework
 *
 * Detects backend and frontend frameworks.
 *
 * Storage routing is handled generically by runDefinitionDetector
 * via each definition's `storage` field.
 *
 * This detector does NOT know about frontend vs backend.
 */
export async function detectFramework(context) {
  const definitions = getApplicableDefinitions(
    FRAMEWORK_DEFINITIONS,
    context,
  );

  await runDefinitionDetector({ context, definitions });
}