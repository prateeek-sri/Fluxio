export function createDependencyEvidence({
  occurrences,
}) {
  return occurrences.map((occurrence) => ({
    type: "dependency",

    package: occurrence.name,

    version: occurrence.version,

    source: occurrence.source,

    packageManager:
      occurrence.packageManager,

    fileId: occurrence.fileId,
  }));
}