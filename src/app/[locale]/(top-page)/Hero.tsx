"use client";
import Image from "next/image";
import React from "react";

interface HeroData {
  title: string[];
  subtitle: string;
  productName: string;
  heroImage: string;
  productGif?: string;
}

interface HeroProps {
  heroData: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full screen background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        style={
          heroData.heroImage
            ? {
                backgroundImage: `url(${heroData.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }
            : {}
        }
      />

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content container */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20 lg:py-12">
            {/* Left Content */}
            <div className="space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  {heroData.title.map((line, index) => (
                    <React.Fragment key={index}>
                      <span
                        className="inline-block animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {line}
                      </span>
                      {index < heroData.title.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
              </div>

              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <p className="text-sm sm:text-base text-white/90 font-light tracking-wide">
                  {heroData.subtitle}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                  {heroData.productName}
                </p>
              </div>
            </div>

            {/* Right Product Display */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 pt-16 lg:pt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                {heroData.productGif && (
                  <div
                    className="relative z-10 group animate-fade-in-up"
                    style={{ animationDelay: "1s" }}
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500" />

                    {/* Main container */}
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 transition-all duration-500">
                      <div className="relative overflow-hidden rounded-xl w-full aspect-square">
                        <Image
                          src={heroData.productGif}
                          alt={heroData.productName}
                          fill
                          className="object-contain rounded-xl"
                          priority
                          unoptimized={heroData.productGif
                            .toLowerCase()
                            .includes(".gif")}
                          sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
                        />
                      </div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-2 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-shimmer pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:flex">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};
