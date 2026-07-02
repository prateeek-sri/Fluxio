import { IMPORT_PATTERNS } from "../definitions/importPatterns.js";

/**
 * extractImports
 *
 * Extracts all import/require statements from a source file's
 * content and returns a normalised list of import records.
 *
 * Each record has the shape:
 *   { importedName, alias, importType, line }
 *
 * Supported forms:
 *   - ESM default:   import foo from 'bar'
 *   - ESM named:     import { A, B } from 'bar'
 *   - CJS require:   const foo = require('bar')
 *
 * NOTE: regex-based for now; AST extraction is the long-term plan.
 */
export function extractImports(file) {
  const imports = [];

  if (!file.content) {
    return imports;
  }

  const content = file.content;

  collectESModuleDefaultImports(content, imports);
  collectESModuleNamedImports(content, imports);
  collectRequireImports(content, imports);

  return imports;
}

// ---------------------------------------------------------------------------
// Collectors
// ---------------------------------------------------------------------------

function collectESModuleDefaultImports(content, imports) {
  // Reset lastIndex because IMPORT_PATTERNS values are /gm regexes
  const regex = new RegExp(
    IMPORT_PATTERNS.ES_MODULE_DEFAULT.source,
    IMPORT_PATTERNS.ES_MODULE_DEFAULT.flags,
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.push({
      importedName: match[2],
      alias: match[1],
      importType: "default",
      line: getLineNumber(content, match.index),
    });
  }
}

function collectESModuleNamedImports(content, imports) {
  const regex = new RegExp(
    IMPORT_PATTERNS.ES_MODULE_NAMED.source,
    IMPORT_PATTERNS.ES_MODULE_NAMED.flags,
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    // Each named export is a separate import record
    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    for (const name of names) {
      imports.push({
        importedName: match[2],
        alias: name,
        importType: "named",
        line: getLineNumber(content, match.index),
      });
    }
  }
}

function collectRequireImports(content, imports) {
  const regex = new RegExp(
    IMPORT_PATTERNS.REQUIRE.source,
    IMPORT_PATTERNS.REQUIRE.flags,
  );

  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.push({
      importedName: match[2],
      alias: match[1].trim(),
      importType: "require",
      line: getLineNumber(content, match.index),
    });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}