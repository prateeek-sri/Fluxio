import { BUILD_TOOL_DEFINITIONS } from "../definitions/buildTools.js";
import { getApplicableDefinitions } from "../helpers/getApplicableDefinitions.js";
import { runDefinitionDetector } from "../helpers/runDefinitionDetector.js";

/**
 * detectBuildTool
 *
 * Detects build tools and bundlers used in the repository.
 *
 * Uses the same generic detection engine as every other detector.
 * Adding new build tools requires only a new entry in definitions/buildTools.js.
 */
export async function detectBuildTool(context) {
  const definitions = getApplicableDefinitions(
    BUILD_TOOL_DEFINITIONS,
    context,
  );

  await runDefinitionDetector({ context, definitions });
}