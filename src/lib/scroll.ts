"use client";
import { useEffect, useState } from "react";

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
      const current = target.documentElement.scrollTop;

      if (lastScrollTop && current > lastScrollTop) {
        setDirection("down");
        if (current > 0) {
          setDistance((d) => (direction == "up" ? 0 : d + 1));
        } else {
          setDistance(0);
        }
      } else {
        setDirection("up");
        if (current > 0) {
          setDistance((d) => (direction == "down" ? 0 : d + 1));
        } else {
          setDistance(0);
        }
      }
      setLastScrollTop(current);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollTop, direction]);

  return {
    direction,
    distance,
  };
};
