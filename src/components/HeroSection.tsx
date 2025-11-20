import Link from "next/link";
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { WordCyclerEncrypted } from './ui/WordCyclerEncrypted.tsx'; 

const HeroSection: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black p-8">
      <div className="max-w-4xl w-full text-center">
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 leading-tight">
          I'm a{' '}
          <WordCyclerEncrypted 
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
          /> 
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 font-light mb-12">
            BCA Student | Aspiring Photographer | Youtube Vlogger | Tech Enthusiast
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          
          <Link href="#about" 
            className={twMerge(
              'px-8 py-3 text-lg font-medium tracking-wider uppercase',
              'text-black bg-white rounded-full transition duration-300',
              'hover:bg-teal-400 hover:text-black shadow-lg hover:shadow-teal-500/50'
            )}
          >
            Explore My Journey /
          </Link>
          
          <Link href="mailto:harshsingh5323@gmail.com?subject=Query%20from%20Website&body=Hi%20Harsh%2C%0AI%20have%20a%20question%20regarding..." 
            className={twMerge(
              'px-8 py-3 text-lg font-medium tracking-wider uppercase',
              'text-white border-2 border-white rounded-full transition duration-300',
              'hover:bg-white hover:text-black'
            )}
          >
            DM for QUERY /
          </Link>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;