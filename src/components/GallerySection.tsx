"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import Link from "next/link";

export function GallerySection() {
  const images = [
    "/assets/1.jpeg",
    "/assets/2.jpeg",
    "/assets/3.jpeg",
    "/assets/4.jpeg",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Bridging Code and The Visual Story.
          {/* The second line with smaller size, italic style, and new color */}
          <br />
          <span
            className="font-normal text-lg md:text-2xl italic text-teal-400"
            // You can change 'text-teal-400' to any other color like 'text-indigo-300' or 'text-pink-400'
          >
            Designing Interfaces. Capturing Moments.
          </span>
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link
            href="/gallery"
          >
            <span>See Gallery →</span>
          </Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
