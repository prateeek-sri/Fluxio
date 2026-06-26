export function createProjectIndex(rootPath) {
    return {
        files: new Map(),

        folders: new Map(),

        metadata: {
            rootPath,

            totalFiles: 0,

            totalFolders: 0,

            scanStartedAt: null,

            scanCompletedAt: null,

            scanDurationMs: 0
        },

        analysis: {}
    };
}