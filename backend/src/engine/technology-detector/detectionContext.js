/**
 * createDetectionContext
 *
 * Creates the shared working memory passed to every detector
 * and evaluator throughout the detection pipeline.
 *
 * Context shape:
 * {
 *   repository:        — reference to the project index data
 *   indexes:           — lazily-built lookup indexes (cached here)
 *   technologyGraph:   — populated by Phase 3
 *   detectionReport:   — populated by Phase 3
 * }
 *
 * Indexes are populated on first access by each index provider.
 * All providers check `context.indexes.<name>` before building.
 */
export function createDetectionContext(projectIndex) {
  return {
    repository: {
      projectIndex,
      files:          projectIndex.files,
      folders:        projectIndex.folders,
      idIndex:        projectIndex.idIndex,
      importantFiles: projectIndex.importantFiles,
      technologies:   projectIndex.technologies,
      metadata:       projectIndex.metadata,
    },

    indexes: {
      extensionIndex:    null,
      fileNameIndex:     null,
      dependencyIndex:   null,
      importIndex:       null,
      functionCallIndex: null,
      memberCallIndex:   null,
    },

    // Populated by Phase 3
    technologyGraph:  null,
    detectionReport:  null,
  };
}
