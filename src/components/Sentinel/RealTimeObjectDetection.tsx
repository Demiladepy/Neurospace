'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface BoundingBox {
    label: string;
    score: number;
    box: { xmax: number; xmin: number; ymax: number; ymin: number };
}

export default function RealTimeObjectDetection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const workerRef = useRef<Worker | null>(null);
    const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [progress, setProgress] = useState(0);

    // Initialize Web Worker
    useEffect(() => {
        if (!workerRef.current) {
            workerRef.current = new Worker('/vision_worker.js', { type: 'module' });

            workerRef.current.onmessage = (e) => {
                const { status, data, output } = e.data;

                if (status === 'loading') { // Initial Model Load
                    if (data.status === 'progress') {
                        setProgress(data.progress || 0);
                    }
                } else if (status === 'complete') { // Inference Done
                    setModelStatus('ready');
                    drawBoxes(output);
                    requestAnimationFrame(processFrame); // Loop
                }
            };
        }

        // Start Video
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    videoRef.current.onloadedmetadata = () => processFrame(); // Start loop once video is ready
                }
            })
            .catch(err => console.error("Camera Error:", err));

        return () => workerRef.current?.terminate();
    }, []);

    const processFrame = useCallback(() => {
        if (!videoRef.current || !workerRef.current || videoRef.current.readyState !== 4) return;

        // Capture frame to canvas to get image data (or just data URL)
        // Simplest for worker: send standard Request/Response or CreateImageBitmap
        // We'll use a temporary canvas to extract data
        const offscreen = document.createElement('canvas');
        offscreen.width = videoRef.current.videoWidth;
        offscreen.height = videoRef.current.videoHeight;
        const ctx = offscreen.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            const imageData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
            // We can send ImageData directly to worker if transferrable, 
            // but transformers.js usually expects an image URL or Raw Image.
            // Let's rely on the pipeline's ability to handle canvas context or data URL.
            // Actually, simplest 'real' way compatible with worker is sending the image data url.
            const dataUrl = offscreen.toDataURL('image/jpeg', 0.5);
            workerRef.current.postMessage({ image: dataUrl });
        }
    }, []);

    const drawBoxes = (boxes: BoundingBox[]) => {
        if (!canvasRef.current || !videoRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        boxes.forEach(box => {
            const { xmin, ymin, xmax, ymax } = box.box;
            const width = xmax - xmin;
            const height = ymax - ymin;

            // Draw Box
            ctx.strokeStyle = '#00FF00'; // Green like typical AI
            ctx.lineWidth = 2;
            ctx.strokeRect(xmin, ymin, width, height);

            // Draw Label
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(xmin, ymin - 20, width, 20);
            ctx.fillStyle = '#000000';
            ctx.font = '14px Arial';
            ctx.fillText(`${box.label} ${Math.round(box.score * 100)}%`, xmin + 5, ymin - 5);
        });
    };

    return (
        <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Video Feed */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
            />

            {/* AI Overlay (Canvas) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover z-10"
            />

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${modelStatus === 'ready' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                <span className="text-xs font-mono text-white/90">
                    {modelStatus === 'loading' ? `Loading Vision AI ${Math.round(progress)}%...` : 'DETR-ResNet-50 Active'}
                </span>
            </div>

            {modelStatus === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <h3 className="text-white font-bold">Initializing Vision Model</h3>
                        <p className="text-slate-400 text-sm">Downloading ~40MB weights to browser...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
