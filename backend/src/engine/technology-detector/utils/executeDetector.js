export async function executeDetector({detector, detectorName, context}) {
  const startTime = Date.now();
  let success = false;
  let normalizedError = null;
  try {
    await detector(context);
    success = true;

  } catch (error) {
    normalizedError = {
      stage: detectorName,
      name: error.name,
      message: error.message,
      timestamp: new Date(),
    };

    context.repository.metadata.errors.push(normalizedError);
  } finally {
    const durationMs = Date.now() - startTime;
    return {
      detector: detectorName,
      success,
      durationMs,
      error: normalizedError,
    };
  }
}
