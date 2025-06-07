import { useState, useEffect } from "react";

interface UseLoadingOptions {
  duration?: number;
  autoStart?: boolean;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { duration = 2000, autoStart = true } = options;
  const [isLoading, setIsLoading] = useState(autoStart);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, autoStart]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};
