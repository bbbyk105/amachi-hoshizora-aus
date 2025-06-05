"use client";
import { Button } from "@/components/ui/button";
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
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-12">
            {/* Left Content */}
            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
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

              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Button
                  variant="outline"
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  DISCOVER MORE
                </Button>
              </div>
            </div>

            {/* Right Product Display */}
            <div className="relative h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                {heroData.productGif && (
                  <div
                    className="relative z-10 group animate-fade-in-up"
                    style={{ animationDelay: "1s" }}
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500" />

                    {/* Main container */}
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 transition-all duration-500">
                      <div className="relative overflow-hidden rounded-xl aspect-square">
                        <Image
                          src={heroData.productGif}
                          alt={heroData.productName}
                          fill
                          className="object-cover rounded-xl"
                          priority
                          unoptimized={heroData.productGif
                            .toLowerCase()
                            .includes(".gif")}
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
