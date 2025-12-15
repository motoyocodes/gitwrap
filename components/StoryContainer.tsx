"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideGrind from "@/components/slides/SlideGrind";
import SlideClock from "@/components/slides/slideClock";
import SlideLanguages from "@/components/slides/SlideLanguages";
import SlideRoast from "@/components/slides/slideRoast";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SlideSummary from "@/app/slideSummary";
import { StoryData } from "@/types";

export default function StoryContainer({ data }: { data: StoryData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // track if we are going Left (-1) or Right (1)
  const [direction, setDirection] = useState(0);

  const slides = [
    <SlideGrind key="grind" data={data} />,
    <SlideClock key="clock" data={data} />,
    <SlideLanguages key="langs" data={data} />,
    <SlideRoast key="roast" data={data} />,
    <SlideSummary key="summary" data={data} />,
  ];

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1); // Moving forward
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1); // Moving backward
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Animation Logic
  const variants = {
    enter: (direction: number) => ({
      // If its going Next (1), enter from Right (100).
      // If its going Prev (-1), enter from Left (-100).
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      // If its going Next (1), exit to Left (-100).
      // If its going Prev (-1), exit to Right (100).
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 px-6 overflow-hidden">
      {/*  Progress Bar  */}
      <div className="absolute top-4 left-0 w-full px-4 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              idx <= currentIndex ? "bg-white" : "bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* Slide with Animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction} // Pass direction to variants
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Invisible Tap Zones */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 z-10"
        onClick={prevSlide}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 z-10"
        onClick={nextSlide}
      />

      {/* Navigation Icons  */}

      {currentIndex < slides.length - 1 && (
        <ChevronRight
          onClick={nextSlide}
          className="absolute right-1 md:right-2 top-1/2 cursor-pointer text-white/20 hover:text-white/50 transition-colors w-8 h-8 z-20"
        />
      )}

      {currentIndex > 0 && (
        <ChevronLeft
          onClick={prevSlide}
          className="absolute left-1 md:left-2 top-1/2 cursor-pointer text-white/20 hover:text-white/50 transition-colors w-8 h-8 z-20"
        />
      )}
    </div>
  );
}
