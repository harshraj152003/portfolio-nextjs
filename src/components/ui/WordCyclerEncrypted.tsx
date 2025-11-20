"use client";
import React, { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EncryptedText } from "./encrypted-text";

// Your list of words that need to be cycled
const WORDS: string[] = ['Developer', 'Traveller', 'Youtuber', 'Vlogger'];

interface WordCyclerEncryptedProps {
  className?: string;
}

export const WordCyclerEncrypted: FC<WordCyclerEncryptedProps> = ({ className }) => {
  const [index, setIndex] = useState<number>(0);
  const currentWord: string = WORDS[index];

  // Effect to cycle the word index every 4 seconds (time for animation + pause)
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        className={className}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <EncryptedText 
          text={currentWord}
        />
      </motion.span>
    </AnimatePresence>
  );
};