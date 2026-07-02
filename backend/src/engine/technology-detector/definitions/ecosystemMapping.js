import { ECOSYSTEMS } from "./ecosystems.js";

/**
 * ECOSYSTEM_MAPPINGS
 *
 * Maps runtime names (the OUTPUT of RUNTIME_DEFINITIONS) to ECOSYSTEMS.
 *
 * inferEcosystems() uses this mapping:
 *   detected runtime name  →  ecosystem constant
 *
 * The "Native" runtime (C, C++, Rust) is intentionally NOT mapped
 * to any single ecosystem. Those languages rely on manifest-based
 * ecosystem detection (e.g. Cargo.toml → Rust).
 */
export const ECOSYSTEM_MAPPINGS = new Map([
  ["Node.js",        ECOSYSTEMS.NODE],
  ["JVM",            ECOSYSTEMS.JAVA],
  ["CPython",        ECOSYSTEMS.PYTHON],
  [".NET CLR",       ECOSYSTEMS.DOTNET],
  ["Go Runtime",     ECOSYSTEMS.GO],
  ["PHP Runtime",    ECOSYSTEMS.PHP],
  ["Ruby MRI",       ECOSYSTEMS.RUBY],
  ["Dart VM",        ECOSYSTEMS.DART],
  ["Swift Runtime",  ECOSYSTEMS.SWIFT],
]);