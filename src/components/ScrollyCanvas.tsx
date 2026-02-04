"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const frameCount = 40;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1],
        { ease: (t) => t } // Linear for smooth frame-by-frame
    );

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/sequence/frame_${i + 1}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Enable high-quality smoothing for best visual result
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const img = images[index];

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

    useEffect(() => {
        let animationFrameId: number;

        const updateFrame = () => {
            const index = Math.round(currentIndex.get());
            if (isLoaded && images.length > 0 && index >= 0 && index < frameCount) {
                renderFrame(index);
            }
            animationFrameId = requestAnimationFrame(updateFrame);
        };

        if (isLoaded) {
            animationFrameId = requestAnimationFrame(updateFrame);
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isLoaded, currentIndex, images, frameCount]);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Use devicePixelRatio for high-DPI displays (4K, Retina, etc.)
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                const currentFrame = Math.floor(currentIndex.get());
                if (isLoaded && images.length > 0) {
                    renderFrame(currentFrame);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    style={{ imageRendering: 'auto' }}
                />
                {/* Dark overlay that fades out as user scrolls */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0.5, 0]) }}
                    className="absolute inset-0 bg-black pointer-events-none"
                />
                <Overlay scrollYProgress={scrollYProgress} />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                        Loading Experience...
                    </div>
                )}
            </div>
        </div>
    );
}
