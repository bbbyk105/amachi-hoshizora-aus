"use client";
import { Button } from "@/components/ui/button";
import { TopicCard } from "./TopicCard";
import React from "react";

interface TopicData {
  id: number;
  title: string;
  description: string;
  image?: string;
  bgColor?: string;
  productColor?: string;
  hasRings?: boolean;
}

interface AboutProps {
  topicsData: TopicData[];
}

export const About: React.FC<AboutProps> = ({ topicsData }) => {
  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-4 sm:mb-6 lg:mb-8 border-b border-gray-300 pb-3 sm:pb-4">
          ABOUT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          {topicsData.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="px-6 sm:px-8 lg:px-12 py-2 sm:py-3 text-sm sm:text-base border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            MORE
          </Button>
        </div>
      </div>
    </div>
  );
};
