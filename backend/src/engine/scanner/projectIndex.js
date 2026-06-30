export function createProjectIndex(rootPath) {
  return {
    files: new Map(),
    folders: new Map(),
    importantFiles: new Map(),
    importantFolders: new Map(),
    idIndex: new Map(),

    technologies: {
      languages: [],
      frameworks: {
        backend: null,
        frontend: null,
      },
      databases: [],
      orms: [],
      runtimes: [],
      packageManagers: [],
      buildTools: [],
      deployment: [],
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
