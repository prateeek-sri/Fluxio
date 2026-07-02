export const PACKAGE_MANAGER_DEFINITIONS = new Map([
  ["package-lock.json", "npm"],
  ["package.json", "npm"],

  ["pnpm-lock.yaml", "pnpm"],

  ["yarn.lock", "Yarn"],

  ["pom.xml", "Maven"],

  ["build.gradle", "Gradle"],
  ["build.gradle.kts", "Gradle"],

  ["Cargo.toml", "Cargo"],

  ["go.mod", "Go Modules"],

  ["composer.json", "Composer"],

  ["Gemfile", "Bundler"],

  ["requirements.txt", "pip"],
  ["pyproject.toml", "pip"],
  ["Pipfile", "Pipenv"],
]);