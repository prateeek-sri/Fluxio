export function filterDefinitionsByEcosystem({
  definitions,
  ecosystems,
}) {
  return definitions.filter((definition) =>
    ecosystems.has(definition.ecosystem),
  );
}