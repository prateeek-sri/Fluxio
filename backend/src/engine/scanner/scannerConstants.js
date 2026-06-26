/**
 * Folders that should never be scanned.
 * These folders either contain generated files,
 * dependencies, IDE configs, or version control data.
 */
export const IGNORE_FOLDERS = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    "target",
    ".idea",
    ".vscode",
    ".turbo",
    ".vercel",
    ".cache"
];

/**
 * Files that should never be analyzed.
 */
export const IGNORE_FILES = [
    ".DS_Store",
    "Thumbs.db"
];

/**
 * File extensions that contain readable source code.
 * These files can later be opened and analyzed.
 */
export const TEXT_FILE_EXTENSIONS = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".kt",
    ".py",
    ".go",
    ".rs",
    ".php",
    ".cs",
    ".cpp",
    ".c",
    ".h",
    ".json",
    ".xml",
    ".yaml",
    ".yml",
    ".properties",
    ".env",
    ".sql",
    ".md"
];

/**
 * Binary files.
 * We never read their contents.
 */
export const BINARY_FILE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".pdf",
    ".zip",
    ".jar",
    ".war",
    ".exe",
    ".dll",
    ".so",
    ".class"
];

/**
 * Framework/configuration files.
 * These are extremely valuable for architecture detection.
 */
export const CONFIG_FILE_NAMES = [
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",

    "pom.xml",
    "build.gradle",
    "settings.gradle",

    "requirements.txt",
    "pyproject.toml",
    "Pipfile",

    "go.mod",
    "Cargo.toml",

    "Dockerfile",
    "docker-compose.yml",

    "README.md",
    "tsconfig.json",

    ".env.example",
    ".gitignore"
];