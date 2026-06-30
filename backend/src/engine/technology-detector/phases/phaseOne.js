import {
    detectLanguage,
    detectPackageManager,
    detectRuntime,
} from "../detectors/index.js";
import { executeDetector } from "../utils/executeDetector.js";

export async function runPhaseOne(context) {
    const stratTime = Date.now();
    let durationMs = 0;
    const detectors = [
        {
            detector: detectLanguage,
            detectorName: "languageDetector",
        },
        {
            detector: detectRuntime,
            detectorName: "runtimeDetector",
        },
        {
            detector: detectPackageManager,
            detectorName: "packageManagerDetector",
        },
    ];
    
    try{
        const results = await Promise.all(
            detectors.map((detectorConfig) =>
            executeDetector({ ...detectorConfig, context }),
        ),
    );

    }finally{
        durationMs = Date.now() - stratTime;
    }
    return {

    };
}