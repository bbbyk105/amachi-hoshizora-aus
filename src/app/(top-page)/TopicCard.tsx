"use client";
import { Card, CardContent } from "@/components/ui/card";
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

interface TopicCardProps {
  topic: TopicData;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-0">
        <div
          className={`aspect-square ${
            topic.image ? "" : `bg-gradient-to-br ${topic.bgColor}`
          } relative overflow-hidden flex items-center justify-center`}
          style={
            topic.image
              ? {
                  backgroundImage: `url(${topic.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {topic.image && <div className="absolute inset-0 bg-black/30"></div>}

          {!topic.image && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
          )}

          {topic.id === 1 && !topic.image && (
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent"></div>
          )}

          {!topic.image && (
            <>
              {topic.id === 1 && (
                <div className="w-10 sm:w-12 lg:w-16 h-14 sm:h-18 lg:h-24 bg-blue-900 rounded-lg shadow-lg"></div>
              )}

              {topic.id === 2 && (
                <>
                  <div
                    className={`w-14 sm:w-18 lg:w-24 h-10 sm:h-12 lg:h-16 bg-gradient-to-b ${topic.productColor} rounded-lg shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-xs text-gray-700 font-medium">
                      富士錦
                    </span>
                  </div>
                  <div className="absolute top-4 sm:top-6 lg:top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 border-2 border-white/20 rounded-full"></div>
                    <div className="absolute inset-2 border border-white/10 rounded-full"></div>
                  </div>
                </>
              )}

              {topic.id === 3 && (
                <>
                  <div
                    className={`w-12 sm:w-16 lg:w-20 h-18 sm:h-24 lg:h-32 bg-gradient-to-b ${topic.productColor} rounded-lg shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-xs text-gray-700 font-medium">
                      天地星空
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-indigo-100/40"></div>
                </>
              )}
            </>
          )}
        </div>
        <div className="p-3 sm:p-4 lg:p-6 space-y-1 sm:space-y-2 lg:space-y-3">
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 leading-tight">
            {topic.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {topic.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
