/**
 * getMemberCallIndex
 *
 * Builds (and caches) the Member Call Index from source files.
 *
 * Index shape:
 *   Map<"object.method", MemberCallOccurrence[]>
 *
 * MemberCallOccurrence:
 *   { objectName, methodName, calledName, fileId, line }
 *
 * Current implementation: regex-based.
 * Long-term plan: AST-based language adapters per language.
 *
 * Supported patterns (JS/TS):
 *   app.get(...)
 *   app.listen(...)
 *   mongoose.connect(...)
 *   router.use(...)
 */
export async function getMemberCallIndex(context) {
  if (context.indexes.memberCallIndex) {
    return context.indexes.memberCallIndex;
  }

  const memberCallIndex = new Map();

  try {
    for (const file of context.repository.files.values()) {
      if (!file.content) {
        continue;
      }

      const calls = extractMemberCalls(file);

      for (const call of calls) {
        // Index by full "object.method" key
        const key = call.calledName;

        if (!memberCallIndex.has(key)) {
          memberCallIndex.set(key, []);
        }

        memberCallIndex.get(key).push({
          ...call,
          fileId: file.id,
        });
      }
    }
  } catch (error) {
    context.repository.metadata.errors.push({
      stage: "memberCallIndexProvider",
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    });
  }

  context.indexes.memberCallIndex = memberCallIndex;
  return memberCallIndex;
}

// ---------------------------------------------------------------------------
// Extraction (regex-based interim implementation)
// ---------------------------------------------------------------------------

/**
 * Matches:  identifier.method(
 * Captures: [1] objectName, [2] methodName
 */
const MEMBER_CALL_REGEX =
  /\b([A-Za-z_$][A-Za-z0-9_$]*)\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/gm;

function extractMemberCalls(file) {
  const calls = [];
  const content = file.content;

  const regex = new RegExp(
    MEMBER_CALL_REGEX.source,
    MEMBER_CALL_REGEX.flags,
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    const objectName = match[1];
    const methodName = match[2];

    calls.push({
      objectName,
      methodName,
      // Use "objectName.methodName" as the lookup key
      calledName: `${objectName}.${methodName}`,
      line: getLineNumber(content, match.index),
    });
  }

  return calls;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}
