import React, { useEffect, useState } from "react";

type StreamingStepsLoaderProps = {
  count?: number;
  streamInterval?: number; // ms
  startShown?: number;
};

export default function StreamingStepsLoader({
  count = 6,
  streamInterval = 220,
  startShown = 0,
}: StreamingStepsLoaderProps) {
  const [visible, setVisible] = useState(Math.min(startShown, count));

  useEffect(() => {
    if (visible >= count) return;
    const t = setInterval(() => {
      setVisible((v) => {
        if (v + 1 >= count) {
          clearInterval(t);
          return count;
        }
        return v + 1;
      });
    }, streamInterval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once

  // helper to get a pleasing randomized width for each skeleton title
  const widthFor = (i: number) => {
    const vals = [70, 55, 40, 80, 60, 50, 45, 75, 35];
    return `${vals[i % vals.length]}%`;
  };

  return (
    <div className="w-full overflow-y-scroll no-scrollbar">
      <div className="flex-1">
        <div className="space-y-3 h-[calc(100vh-370px)] p-2">
          {Array.from({ length: count }).map((_, i) => {
            const isShown = i < visible;
            return (
              <div
                key={i}
                className={`p-1 rounded-lg transition-all duration-300 ease-out transform ` +
                  `${isShown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              >
                <div
                  className={`flex items-center gap-2 p-2 rounded ` +
                    `${isShown ? "bg-zinc-800 border border-zinc-700" : "bg-transparent"}`}
                >
                  {/* icon skeleton */}
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full ${
                      isShown ? "bg-zinc-700 animate-pulse" : "bg-transparent"
                    }`}
                  />

                  {/* title skeleton */}
                  <div className="flex-1">
                    <div
                      className={`h-4 rounded ${isShown ? "animate-pulse bg-zinc-700" : "bg-transparent"}`}
                      style={{ width: isShown ? widthFor(i) : "0%" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
