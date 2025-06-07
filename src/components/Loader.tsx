import React from "react";
import clsx from "clsx";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "red" | "green" | "yellow"; // 使う色だけ列挙
  backgroundColor?: "white" | "gray-50" | "transparent";
}

export const Loader: React.FC<LoaderProps> = ({
  text = "Loading...",
  size = "md",
  color = "blue",
  backgroundColor = "white",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  const colorMap = {
    blue: "border-t-blue-600",
    red: "border-t-red-600",
    green: "border-t-green-600",
    yellow: "border-t-yellow-500",
  } as const;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        `bg-${backgroundColor}`
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={clsx(
            sizeClasses[size],
            "border-gray-200 rounded-full animate-spin",
            colorMap[color] // ← ここで静的に確定
          )}
        />
        {text && <p className="text-gray-600 font-medium">{text}</p>}
      </div>
    </div>
  );
};
