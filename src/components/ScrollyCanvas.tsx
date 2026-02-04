"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const frameCount = 192;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1],
        { ease: (t) => t }
    );

    useEffect(() => {
        const loadImagesInBatches = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;
            const batchSize = 10; // Load 10 images at a time to be safe

            for (let i = 0; i < frameCount; i += batchSize) {
                const batch = [];
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batch.push(new Promise<void>((resolve) => {
                        const img = new Image();
                        // Use a timestamp to bypass any weird caching issues during development
                        img.src = `/sequence/frame_${j}.png`;
                        img.onload = () => {
                            loadedImages[j] = img;
                            loadedCount++;
                            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve();
                        };
                        img.onerror = () => {
                            console.error(`Failed to load frame ${j}`);
                            loadedCount++; // Still count it to advance progress
                            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve();
                        };
                    }));
                }
                await Promise.all(batch);
            }

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImagesInBatches();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Find the closest available frame if the exact one isn't loaded
        let img = images[index];
        if (!img) {
            // Search backwards for the last available frame
            for (let i = index; i >= 0; i--) {
                if (images[i]) {
                    img = images[i];
                    break;
                }
            }
        }

        if (!img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Use a regular effect for the animation loop
    useEffect(() => {
        let animationFrameId: number;

        const updateFrame = () => {
            const index = Math.round(currentIndex.get());
            if (images.length > 0) {
                renderFrame(index);
            }
            animationFrameId = requestAnimationFrame(updateFrame);
        };

        animationFrameId = requestAnimationFrame(updateFrame);
        return () => cancelAnimationFrame(animationFrameId);
    }, [images, currentIndex]);

    // Handle initial render and resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                renderFrame(Math.round(currentIndex.get()));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    return (
        <div ref={containerRef} className="h-[600vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    style={{ imageRendering: 'auto' }}
                />

                {/* Dark overlay that fades out as user scrolls */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0.6, 0]) }}
                    className="absolute inset-0 bg-black pointer-events-none"
                />

                <Overlay scrollYProgress={scrollYProgress} />

                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50">
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
                            Loading Story {loadingProgress}%
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

