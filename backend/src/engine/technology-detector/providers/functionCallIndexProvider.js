/**
 * getFunctionCallIndex
 *
 * Builds (and caches) the Function Call Index from source files.
 *
 * Index shape:
 *   Map<calledFunctionName, FunctionCallOccurrence[]>
 *
 * FunctionCallOccurrence:
 *   { calledName, fileId, line }
 *
 * Current implementation: regex-based.
 * Long-term plan: replace with AST-based language adapters.
 *
 * Supported patterns (JS/TS):
 *   express()
 *   createApp()
 *   Fastify()
 */
export async function getFunctionCallIndex(context) {
  if (context.indexes.functionCallIndex) {
    return context.indexes.functionCallIndex;
  }

  const functionCallIndex = new Map();

  try {
    for (const file of context.repository.files.values()) {
      if (!file.content) {
        continue;
      }

      const calls = extractFunctionCalls(file);

      for (const call of calls) {
        if (!functionCallIndex.has(call.calledName)) {
          functionCallIndex.set(call.calledName, []);
        }

        functionCallIndex
          .get(call.calledName)
          .push({
            ...call,
            fileId: file.id,
          });
      }
    }
  } catch (error) {
    context.repository.metadata.errors.push({
      stage: "functionCallIndexProvider",
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    });
  }

  context.indexes.functionCallIndex = functionCallIndex;
  return functionCallIndex;
}

// ---------------------------------------------------------------------------
// Extraction (regex-based interim implementation)
// ---------------------------------------------------------------------------

/**
 * Matches standalone function calls like:
 *   express()
 *   Fastify({ ... })
 *   createConnection(...)
 *
 * Does NOT match method calls (those are handled by memberCallIndexProvider).
 */
const FUNCTION_CALL_REGEX =
  /\b([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/gm;

/**
 * Words that are almost certainly not function calls worth indexing
 * (keywords, control-flow, etc.)
 */
const SKIP_NAMES = new Set([
  "if", "for", "while", "switch", "catch", "function",
  "class", "return", "import", "export", "new", "typeof",
  "instanceof", "void", "delete", "throw", "await", "async",
  "of", "in", "else", "do", "yield", "let", "const", "var",
]);

function extractFunctionCalls(file) {
  const calls = [];
  const content = file.content;

  // Reset regex state
  const regex = new RegExp(
    FUNCTION_CALL_REGEX.source,
    FUNCTION_CALL_REGEX.flags,
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];

    if (SKIP_NAMES.has(name)) {
      continue;
    }

    // Skip if preceded by a dot (it's a method call)
    const charBefore = content[match.index - 1];
    if (charBefore === ".") {
      continue;
    }

    calls.push({
      calledName: name,
      line: getLineNumber(content, match.index),
    });
  }

  return calls;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}
