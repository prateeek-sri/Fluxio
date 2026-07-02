export function createProjectIndex(rootPath) {
  return {
    files: new Map(),
    folders: new Map(),
    importantFiles: new Map(),
    importantFolders: new Map(),
    idIndex: new Map(),

    technologies: {
      languages: new Map(),
      frameworks: {
        backend: new Map(),
        frontend: new Map(),
      },
      databases: new Map(),
      orms: new Map(),
      runtimes: new Map(),
      packageManagers: new Map(),
      buildTools: new Map(),
      deployment: new Map(),
      ecosystems: new Map(),
    },

    metadata: {
      rootPath,
      totalFiles: 0,
      totalFolders: 0,
      scanStartedAt: null,
      scanCompletedAt: null,
      scanDurationMs: 0,
      warnings: [],
      errors: [],
    },
  };
}
