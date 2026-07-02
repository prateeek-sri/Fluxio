export const IGNORED_FOLDERS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
  ".idea",
  ".vscode",
  "target",
  "bin",
  "out",
];

export const IGNORED_FILES = [".DS_Store", "Thumbs.db"];

export const IMPORTANT_FILES = [
  // ── Node.js / JavaScript ────────────────────────────────────
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",

  // ── Java ────────────────────────────────────────────────────
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "settings.gradle",
  "settings.gradle.kts",
  "mvnw",
  "gradlew",

  // ── Python ──────────────────────────────────────────────────
  "requirements.txt",
  "Pipfile",
  "pyproject.toml",
  "poetry.lock",
  "manage.py",
  "settings.py",
  "urls.py",

  // ── Go ──────────────────────────────────────────────────────
  "go.mod",
  "go.sum",

  // ── Rust ─────────────────────────────────────────────────────
  "Cargo.toml",
  "Cargo.lock",

  // ── PHP ──────────────────────────────────────────────────────
  "composer.json",
  "composer.lock",

  // ── Ruby ─────────────────────────────────────────────────────
  "Gemfile",
  "Gemfile.lock",
  "Rakefile",

  // ── .NET ─────────────────────────────────────────────────────
  // .csproj files would need extension matching

  // ── Build / Bundler Config ──────────────────────────────────
  "webpack.config.js",
  "webpack.config.ts",
  "webpack.config.mjs",
  "vite.config.js",
  "vite.config.ts",
  "vite.config.mjs",
  "rollup.config.js",
  "rollup.config.mjs",
  "rollup.config.ts",
  "esbuild.config.js",
  "turbo.json",
  "babel.config.js",
  "babel.config.json",
  ".babelrc",
  ".swcrc",

  // ── Framework Config ────────────────────────────────────────
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
  "nuxt.config.js",
  "nuxt.config.ts",
  "svelte.config.js",
  "angular.json",
  "gatsby-config.js",
  "gatsby-config.ts",
  "astro.config.mjs",
  "astro.config.ts",
  "tsconfig.json",

  // ── ORM Config ──────────────────────────────────────────────
  "schema.prisma",
  "drizzle.config.ts",
  "drizzle.config.js",
  "knexfile.js",
  "knexfile.ts",
  "ormconfig.json",
  "ormconfig.js",
  "ormconfig.ts",
  ".sequelizerc",
  "hibernate.cfg.xml",
  "persistence.xml",

  // ── Deployment / Infrastructure ─────────────────────────────
  "Dockerfile",
  ".dockerignore",
  "docker-compose.yml",
  "docker-compose.yaml",
  "compose.yml",
  "compose.yaml",
  "vercel.json",
  "netlify.toml",
  "Procfile",
  "fly.toml",
  "render.yaml",
  "railway.json",
  "railway.toml",
  "serverless.yml",
  "serverless.yaml",
  "serverless.ts",
  "app.yaml",
  "nginx.conf",
  "main.tf",
  "terraform.tfvars",
  ".github",
  "Makefile",

  // ── Spring Boot Config ──────────────────────────────────────
  "application.properties",
  "application.yml",
  "application.yaml",

  // ── General ─────────────────────────────────────────────────
  "README.md",
  ".gitignore",
  ".env",
  ".env.example",
  "artisan",
];

export const IMPORTANT_FOLDERS = [
  "src",
  "app",
  "pages",
  "routes",
  "controllers",
  "services",
  "models",
  "middlewares",
  "middleware",
  "config",
  "database",
  "db",
  "prisma",
  "public",
  "static",
  "test",
  "tests",
  "components",
  "views",
  "templates",
  "api",
  "lib",
  "utils",
  "helpers",
  "migrations",
  ".github",
];

export const IGNORED_EXTENSIONS = [
".png",
".jpg",
".jpeg",
".gif",
".webp",
".ico",

".mp4",
".mov",
".avi",

".zip",
".rar",
".7z",

".exe",
".dll",

".class"
];
