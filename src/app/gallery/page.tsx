"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have the cn utility
import { motion } from 'framer-motion';


const ALL_IMAGES = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `/assets/${i + 1}.jpeg`, 
  alt: `Gallery Images ${i + 1}`,
}));

const IMAGES_PER_PAGE = 6;


const GalleryPage = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  
  // Get the current page number from the URL, defaulting to 1
  const initialPage = pageParam ? parseInt(pageParam) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Recalculate current page if URL changes
  useEffect(() => {
    const newPage = pageParam ? parseInt(pageParam) : 1;
    if (newPage !== currentPage) {
        setCurrentPage(newPage);
    }
  }, [pageParam]);

  const totalPages = Math.ceil(ALL_IMAGES.length / IMAGES_PER_PAGE);

  // Calculate the images to display on the current page
  const currentImages = useMemo(() => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    return ALL_IMAGES.slice(startIndex, endIndex);
  }, [currentPage]);
  
  // --- Pagination Handlers ---
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Home Button */}
        <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-teal-400">Visual Stories Gallery</h1>
            <Link href="/">
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 shadow-md">
                    ← Go Home
                </button>
            </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-72 object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* --- Pagination --- */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          
          <Link 
            href={`/gallery?page=${currentPage - 1}`}
            onClick={handlePrevious}
            className={cn(
                "px-4 py-2 rounded-lg font-medium transition duration-300",
                currentPage === 1 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-teal-500 hover:bg-teal-600 text-white"
            )}
            aria-disabled={currentPage === 1}
          >
            Previous
          </Link>
          
          <span className="text-lg font-semibold text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          
          <Link 
            href={`/gallery?page=${currentPage + 1}`}
            onClick={handleNext}
            className={cn(
                "px-4 py-2 rounded-lg font-medium transition duration-300",
                currentPage === totalPages 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-teal-500 hover:bg-teal-600 text-white"
            )}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </Link>

        </div>
      </div>
    </div>
  );
};

export default GalleryPage;