import fs from "fs/promises";
import path from "path";

const IGNORE_FOLDERS = [
    ".git",
    "node_modules",
    "dist",
    "build",
    "target",
    ".next",
    ".vscode",
    ".idea",
];

const IMPORTANT_CONFIG_FILES = [
    "package.json",
    "package-lock.json",
    "pom.xml",
    "build.gradle",
    "settings.gradle",
    "requirements.txt",
    "pyproject.toml",
    "go.mod",
    "Cargo.toml",
    "Dockerfile",
    "docker-compose.yml",
    "README.md",
    ".env.example",
    "tsconfig.json"
];

const IMPORTANT_FOLDERS = [
    "src",
    "routes",
    "controllers",
    "services",
    "models",
    "middlewares",
    "config",
    "repository",
    "repositories",
    "dao",
    "entities",
    "entity",
    "api",
    "handlers",
    "graphql"
];

function createProjectIndex() {
    return {
        files: [],
        folders: [],
        metadata: {}
    };
}

export async function buildProjectIndex(projectPath) {

    const projectIndex = createProjectIndex();

    await scanDirectory(projectPath, projectIndex);

    return projectIndex;
}

async function scanDirectory(directoryPath, projectIndex) {

    const items = await fs.readdir(directoryPath, {
        withFileTypes: true,
    });

    for (const item of items) {

        if(IGNORE_FOLDERS.includes(item.name)) continue;
        
        const fullPath = path.join(directoryPath, item.name);

        if(item.isDirectory()) {
           
            await scanDirectory(fullPath, projectIndex);
        }
    }
}

export default scanDirectory;