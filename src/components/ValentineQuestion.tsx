"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ValentineQuestion() {
    const [noClickCount, setNoClickCount] = useState(0);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const noButtonRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleYesClick = () => {
        router.push("/yes");
    };

    const moveNoButton = () => {
        if (noClickCount >= 4) {
            setShowPopup(true);
            return;
        }

        // Generate random position within safe bounds
        const maxX = 200;
        const maxY = 100;
        const randomX = (Math.random() - 0.5) * maxX;
        const randomY = (Math.random() - 0.5) * maxY;

        setNoPosition({ x: randomX, y: randomY });
        setNoClickCount(prev => prev + 1);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setNoClickCount(0);
        setNoPosition({ x: 0, y: 0 });
    };

    return (
        <section className="relative w-full min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
            {/* Animated breathing background - matching photo colors */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.25) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
                        'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.2) 30%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)',
                        'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.2) 30%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)',
                        'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.25) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
                        'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.25) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 opacity-70"
            />

            {/* Secondary breathing layer */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 70% 30%, rgba(219, 39, 119, 0.2) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 60%)',
                        'radial-gradient(circle at 30% 70%, rgba(37, 99, 235, 0.2) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 60%)',
                        'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.2) 0%, rgba(219, 39, 119, 0.15) 40%, transparent 60%)',
                        'radial-gradient(circle at 30% 30%, rgba(219, 39, 119, 0.2) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 60%)',
                        'radial-gradient(circle at 70% 30%, rgba(219, 39, 119, 0.2) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 60%)',
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute inset-0 opacity-50"
            />

            <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
                {/* Question */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight"
                >
                    Will you be my valentine?
                </motion.h1>

                {/* Buttons Container */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
                    {/* YES Button with enhanced breathing animation */}
                    <motion.button
                        onClick={handleYesClick}
                        animate={{
                            scale: [1, 1.08, 1],
                            boxShadow: [
                                '0 0 20px rgba(236, 72, 153, 0.4)',
                                '0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
                                '0 0 20px rgba(236, 72, 153, 0.4)',
                            ],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-16 py-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-2xl md:text-3xl font-bold rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                        {/* Animated shine effect */}
                        <motion.div
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 1
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        <span className="relative z-10">YES 💕</span>
                    </motion.button>

                    {/* NO Button with evasive behavior */}
                    <motion.div
                        ref={noButtonRef}
                        animate={{
                            x: noPosition.x,
                            y: noPosition.y,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        className="relative"
                    >
                        <button
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                            className="px-16 py-6 bg-gray-700 text-white text-2xl md:text-3xl font-bold rounded-full shadow-xl hover:bg-gray-600 transition-colors"
                        >
                            NO
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Popup after 5 attempts */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-gradient-to-br from-pink-500 to-rose-600 p-12 rounded-3xl shadow-2xl max-w-md text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                            Nthuaa Ammueeee..!
                        </h2>
                        <button
                            onClick={handlePopupClose}
                            className="px-12 py-4 bg-white text-rose-600 text-xl font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            Sorrry Allennee
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
