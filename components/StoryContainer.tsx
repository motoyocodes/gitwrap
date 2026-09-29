"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideGrind from "@/components/slides/SlideGrind";
import SlideClock from "@/components/slides/slideClock";
import SlideRhythm from "@/components/slides/SlideRhythm";
import SlideLanguages from "@/components/slides/SlideLanguages";
import SlideRoast from "@/components/slides/slideRoast";
import SlideSummary from "@/app/slideSummary";
import { ChevronRight, ChevronLeft, Volume2, VolumeX, Pause } from "lucide-react";
import { StoryData } from "@/types";
import { sound } from "@/lib/sound";

const SLIDE_DURATION = 5500; // 5.5s per slide

export default function StoryContainer({ data }: { data: StoryData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const pointerDownTimeRef = useRef<number>(0);

  const slides = [
    <SlideGrind key="grind" data={data} />,
    <SlideClock key="clock" data={data} />,
    <SlideRhythm key="rhythm" data={data} />,
    <SlideLanguages key="langs" data={data} />,
    <SlideRoast key="roast" data={data} />,
    <SlideSummary key="summary" data={data} />,
  ];

  const isLastSlide = currentIndex === slides.length - 1;

  // Sound triggers based on slide index
  const triggerSlideSound = useCallback((index: number, dir: number) => {
    if (index === 4) {
      sound.playRoastHit();
    } else if (index === 5) {
      sound.playCelebration();
    } else if (dir > 0) {
      sound.playSlideNext();
    } else if (dir < 0) {
      sound.playSlidePrev();
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => {
        const nextIdx = prev + 1;
        triggerSlideSound(nextIdx, 1);
        return nextIdx;
      });
    }
  }, [currentIndex, slides.length, triggerSlideSound]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => {
        const prevIdx = prev - 1;
        triggerSlideSound(prevIdx, -1);
        return prevIdx;
      });
    }
  }, [currentIndex, triggerSlideSound]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key.toLowerCase() === "m") {
        const muted = sound.toggleMute();
        setIsMuted(muted);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Tap vs hold handlers
  const handleZoneDown = () => {
    pointerDownTimeRef.current = Date.now();
    setIsPaused(true);
  };

  const handleLeftUp = () => {
    const holdDuration = Date.now() - pointerDownTimeRef.current;
    setIsPaused(false);
    if (holdDuration < 250) {
      prevSlide();
    }
  };

  const handleRightUp = () => {
    const holdDuration = Date.now() - pointerDownTimeRef.current;
    setIsPaused(false);
    if (holdDuration < 250) {
      nextSlide();
    }
  };

  const handleCenterUp = () => {
    setIsPaused(false);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Slide Animation Variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : "0%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden select-none">
      {/* Top Header Controls: Progress Bars & Audio Toggle */}
      <div className="absolute top-0 left-0 w-full p-4 z-40 flex flex-col gap-2 pointer-events-none">
        {/* Progress Bar Segments */}
        <div className="flex gap-1.5 w-full">
          {slides.map((_, idx) => {
            const isCompleted = idx < currentIndex || (idx === currentIndex && isLastSlide);
            const isCurrent = idx === currentIndex && !isLastSlide;

            return (
              <div
                key={idx}
                className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
              >
                <div
                  key={`progress-${idx}-${currentIndex}`}
                  className="h-full bg-white rounded-full"
                  style={{
                    width: isCompleted ? "100%" : "0%",
                    animation: isCurrent
                      ? `storyProgress ${SLIDE_DURATION}ms linear forwards`
                      : "none",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                  onAnimationEnd={() => {
                    if (isCurrent) {
                      nextSlide();
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Audio / Pause Status Bar */}
        <div className="flex items-center justify-between px-1 text-xs text-white/50">
          <div className="flex items-center gap-1.5">
            {isPaused && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white/90 border border-white/10 animate-pulse">
                <Pause className="w-2.5 h-2.5 fill-white" /> Paused
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer pointer-events-auto"
            title={isMuted ? "Unmute audio" : "Mute audio"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>
        </div>
      </div>

      {/* Slide with Framer Motion Animation */}
      <div className="w-full h-full pt-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {slides[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Invisible Interactive Tap Zones */}
      {/* On last slide, restrict tap zones to top 60% so bottom action buttons remain easily clickable */}
      <div
        className={`absolute top-0 left-0 w-1/3 ${
          isLastSlide ? "h-3/5" : "h-full"
        } z-20 cursor-pointer`}
        onPointerDown={handleZoneDown}
        onPointerUp={handleLeftUp}
        onPointerCancel={() => setIsPaused(false)}
      />
      <div
        className={`absolute top-0 left-1/3 w-1/3 ${
          isLastSlide ? "h-3/5" : "h-full"
        } z-20 cursor-pointer`}
        onPointerDown={handleZoneDown}
        onPointerUp={handleCenterUp}
        onPointerCancel={() => setIsPaused(false)}
      />
      <div
        className={`absolute top-0 right-0 w-1/3 ${
          isLastSlide ? "h-3/5" : "h-full"
        } z-20 cursor-pointer`}
        onPointerDown={handleZoneDown}
        onPointerUp={handleRightUp}
        onPointerCancel={() => setIsPaused(false)}
      />

      {/* Desktop Navigation Arrows */}
      {currentIndex < slides.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white/50 hover:text-white transition-all cursor-pointer z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {currentIndex > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white/50 hover:text-white transition-all cursor-pointer z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
