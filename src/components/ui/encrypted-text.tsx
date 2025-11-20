"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

// --- Type Definitions ---
type EncryptedTextProps = {
  text: string;
  className?: string;

  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

// --- Constants and Utility Functions ---
const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}

// --- Component Implementation ---

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  // 1. Initial State: This is the content that gets rendered on the server.
  // By initializing it with the final 'text', the server and client match.
  const [displayText, setDisplayText] = useState(text);
  const [revealCount, setRevealCount] = useState<number>(0);
  
  // Refs for animation management
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFlipTimeRef = useRef<number>(0);

  // This ref holds the current gibberish characters that are being flipped.
  // It is initialized empty/with spaces to avoid server-side randomness.
  const scrambleCharsRef = useRef<string[]>(
    text ? text.split("").map(c => c === " " ? " " : " ") : [],
  );

  useEffect(() => {
    if (!isInView || !text) return;

    // --- Start Animation on Client after InView ---

    const totalLength = text.length;

    // 2. Initialize gibberish state on the client side only
    const initialGibberish = generateGibberishPreservingSpaces(text, charset);
    scrambleCharsRef.current = initialGibberish.split("");
    
    // Set the initial scrambled text to start the effect
    setDisplayText(initialGibberish);
    setRevealCount(0);

    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    
    let isCancelled = false;

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTimeRef.current;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      // Re-randomize unrevealed scramble characters on an interval
      const timeSinceLastFlip = now - lastFlipTimeRef.current;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < totalLength; index += 1) {
          if (index >= currentRevealCount) {
            // Only scramble non-space characters
            if (text[index] !== " ") {
              scrambleCharsRef.current[index] =
                generateRandomCharacter(charset);
            } else {
              scrambleCharsRef.current[index] = " ";
            }
          }
        }
        lastFlipTimeRef.current = now;
      }
      
      // Construct the display string for the current frame
      const newDisplay = text.split("").map((char, index) => {
        const isRevealed = index < currentRevealCount;
        
        return isRevealed 
          ? char 
          : scrambleCharsRef.current[index] || " "; // Use the current flipped char
      }).join("");

      setDisplayText(newDisplay);
      setRevealCount(currentRevealCount);

      if (currentRevealCount < totalLength) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        // Ensure final display state is the correct text
        setDisplayText(text);
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text} // Good practice for accessibility
      role="text"
    >
      {/* 3. Render the state-driven display text */}
      {displayText.split("").map((char, index) => {
        const isRevealed = index < revealCount;
        
        // This is key: Even when rendering the final text on the server,
        // we use the final 'text' to determine the length and classes.
        // The *content* (char) comes from displayText.
        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {char}
          </span>
        );
      })}
    </motion.span>
  );
};