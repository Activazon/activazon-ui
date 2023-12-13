"use client";
import React, { useEffect, useState } from "react";

export const useScrollingDirection = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number | undefined>(
    undefined
  );
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [distance, setDistance] = useState<number>(0);
  useEffect(() => {
    if (typeof lastScrollTop == "undefined") {
      setLastScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop
      );
    }
  }, [lastScrollTop]);
  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as Document;
      const last = target.documentElement.scrollTop;
      if (lastScrollTop && last > lastScrollTop) {
        setDirection("down");
        setDistance((d) => (direction == "up" ? 0 : d + 1));
      } else {
        setDirection("up");
        setDistance((d) => (direction == "down" ? 0 : d + 1));
      }
      setLastScrollTop(last);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollTop, direction]);

  return {
    direction,
    distance,
  };
};
