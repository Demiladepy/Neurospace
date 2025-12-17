
// We use a Web Worker to run the heavy AI model off the main thread
// CDN Import for browser-native Module Worker support
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Skip local checks for demo environments to avoid CORS issues with local models if not properly served
env.allowLocalModels = false;
env.useBrowserCache = true;

class VisionPipeline {
    static task = 'object-detection';
    static model = 'Xenova/detr-resnet-50'; // Efficient object detection
    static instance = null;

    static async getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback: progressCallback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { image } = event.data;

    try {
        const detector = await VisionPipeline.getInstance((data) => {
            self.postMessage({ status: 'loading', data });
        });

        const output = await detector(image, { threshold: 0.5, percentage: true });

        self.postMessage({ status: 'complete', output });
    } catch (e) {
        self.postMessage({ status: 'error', error: e });
    }
});
