/**
 * IMPORT_PATTERNS
 *
 * Regex patterns used by extractImports.js to find import/require
 * statements in JavaScript and TypeScript source files.
 *
 * These are intentionally kept as simple string patterns so the
 * caller controls the RegExp flags (e.g. "gm").
 *
 * NOTE: AST-based extraction is the long-term plan.
 *       These regex patterns are the interim implementation.
 */
export const IMPORT_PATTERNS = Object.freeze({
  /**
   * ESM default import:  import express from 'express'
   *                      import express from "express"
   * Capture groups:
   *   [1] local alias  (e.g. "express")
   *   [2] module name  (e.g. "express")
   */
  ES_MODULE_DEFAULT:
    /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/gm,

  /**
   * ESM named import:  import { Router } from 'express'
   *                    import { A, B } from 'some-lib'
   * Capture groups:
   *   [1] named exports list (e.g. "Router" or "A, B")
   *   [2] module name
   */
  ES_MODULE_NAMED:
    /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/gm,

  /**
   * CommonJS require:  const express = require('express')
   *                    const { something } = require('lib')
   * Capture groups:
   *   [1] local binding (e.g. "express" or "{ something }")
   *   [2] module name
   */
  REQUIRE:
    /(?:const|let|var)\s+([\w{}\s,]+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/gm,
});
