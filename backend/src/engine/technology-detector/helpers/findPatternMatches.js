export function findPatternMatches({
  index,
  patterns,
}) {
  const occurrenceMap = new Map();

  const matchedPatterns = [];

  for (const pattern of patterns) {
    const matches = matchPattern(index, pattern);

    if (matches.length === 0) {
      continue;
    }

    matchedPatterns.push(pattern);

    for (const occurrence of matches) {
      const key = buildOccurrenceKey(occurrence);

      if (!occurrenceMap.has(key)) {
        occurrenceMap.set(key, occurrence);
      }
    }
  }

  return {
    matched: occurrenceMap.size > 0,

    matchedPatterns,

    occurrences: [...occurrenceMap.values()],
  };
}

function matchPattern(index, pattern) {
  if (pattern.includes("*")) {
    return matchWildcard(index, pattern);
  }

  if (pattern.endsWith("-")) {
    return matchPrefix(index, pattern);
  }

  return matchExact(index, pattern);
}

function matchExact(index, pattern) {
  return index.get(pattern) ?? [];
}

function matchPrefix(index, prefix) {
  const matches = [];

  for (const [key, occurrences] of index.entries()) {
    if (key.startsWith(prefix)) {
      matches.push(...occurrences);
    }
  }

  return matches;
}

function matchWildcard(index, pattern) {
  const matches = [];

  const regex = wildcardToRegex(pattern);

  for (const [key, occurrences] of index.entries()) {
    if (regex.test(key)) {
      matches.push(...occurrences);
    }
  }

  return matches;
}

function wildcardToRegex(pattern) {
  const escaped = pattern.replace(
    /[.+?^${}()|[\]\\]/g,
    "\\$&",
  );

  return new RegExp(
    "^" + escaped.replace(/\*/g, ".*") + "$",
  );
}

function buildOccurrenceKey(occurrence) {
  return [
    occurrence.fileId ?? "",
    occurrence.line ?? "",
    occurrence.name ??
      occurrence.importedName ??
      occurrence.value ??
      "",
  ].join(":");
}