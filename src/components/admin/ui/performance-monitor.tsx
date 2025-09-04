'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMonitorProps {
  queryKey: string;
  isLoading: boolean;
  error?: any;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  queryKey, 
  isLoading, 
  error 
}) => {
  const startTimeRef = useRef<number | null>(null);
  const prevIsLoadingRef = useRef<boolean>(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const prevIsLoading = prevIsLoadingRef.current;

    // Transition: idle -> loading
    if (isLoading && !prevIsLoading) {
      startTimeRef.current = Date.now();
      setLoadTime(null);
    }

    // Transition: loading -> loaded
    if (!isLoading && prevIsLoading && !error && startTimeRef.current) {
      const duration = Date.now() - startTimeRef.current;
      setLoadTime(duration);
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${queryKey} loaded in ${duration}ms`);
      }
      startTimeRef.current = null;
    }

    prevIsLoadingRef.current = isLoading;
  }, [isLoading, error, queryKey]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-50">
      <div className="font-mono">
        <div>Query: {queryKey}</div>
        <div>Status: {isLoading ? 'Loading...' : error ? 'Error' : 'Loaded'}</div>
        {loadTime && <div>Time: {loadTime}ms</div>}
      </div>
    </div>
  );
};
