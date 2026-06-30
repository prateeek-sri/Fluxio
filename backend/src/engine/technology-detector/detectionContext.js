function createDetectionContext(projectIndex) {
  const context = {
    repository: {
      projectIndex,
      files: projectIndex.files,
      folders: projectIndex.folders,
      idIndex: projectIndex.idIndex,
      technologies: projectIndex.technologies,
      metadata: projectIndex.metadata,
    },

    cache: {},
  };
  return context;
}
