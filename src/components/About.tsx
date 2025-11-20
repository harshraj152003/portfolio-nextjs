// src/components/About.tsx

import React from "react";
import { cn } from "@/lib/utils";
import { HoverEffectItem } from "./ui/hover-effect";
import { HoverEffect } from "./ui/card-hover-effect";

// 1. Define the data for the skills cards
const skillsData: HoverEffectItem[] = [
  {
    title: "Web Development",
    description: "Expertise in core front-end technologies: HTML, CSS, JavaScript, React, and Next.js.",
    link: "#web-dev", // Use relevant internal/external links
  },
  {
    title: "Programming Languages",
    description: "Proficiency in foundational and object-oriented languages: C, C++, Java, and Python.",
    link: "#programming",
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive user interfaces using industry-standard tools like Adobe XD and Figma.",
    link: "#ui-ux",
  },
  {
    title: "Photography/Editing",
    description: "Passionate about capturing moments and professional editing with Adobe Lightroom and Photoshop.",
    link: "#photography",
  },
  {
    title: "Soft Skills",
    description: "Strong capabilities in Problem Solving, Creativity, and effective Collaboration.",
    link: "#soft-skills",
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-teal-400">
          About Me
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image Section */}
          <div className="lg:w-1/3 flex justify-center">
            <img 
              src="/assets/myi2.jpeg"
              alt="Harsh Raj" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-black-400 transform transition duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Bio Section */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8">
              I am a **4th-semester BCA student** with a passion for designing **intuitive user interfaces** and creating meaningful digital experiences. Along with my academic pursuit, I am also a **passionate photographer** who loves capturing moments from different places. My academic and personal interests drive me to bridge the gap between technical functionality and aesthetic design.
            </p>

            {/* Skills & Expertise Section (Before Cards) */}
            <h3 className="text-3xl font-bold mb-6 text-teal-300 border-b border-teal-700 pb-2">
              Skills & Expertise
            </h3>
            <p className="text-md text-gray-400">
              Hover over the cards below to see details about my key areas of expertise.
            </p>
            
          </div>
        </div>
        
        {/* Skills Cards using HoverEffect */}
        <div className="mt-8">
          <HoverEffect items={skillsData} className="max-w-5xl mx-auto" />
        </div>
        
      </div>
    </section>
  );
};

export default About;