"use client";

import { useRef, useState } from "react";

export function useHoverPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [flipLeft, setFlipLeft] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);

    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const hoverWidth = 280;
    const padding = 16;

    const spaceRight = window.innerWidth - rect.right;
    setFlipLeft(spaceRight < hoverWidth + padding);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setFlipLeft(false);
  };

  return {
    wrapperRef,
    isHovered,
    flipLeft,
    onMouseEnter,
    onMouseLeave,
  };
}
