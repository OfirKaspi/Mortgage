/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";

interface DraggableOptions {
  size: number;
  initialPosition?: { x: number; y: number } | null;
  padding?: number;
  disabled?: boolean,
}

const passiveFalse: AddEventListenerOptions = { passive: false };

/**
 * Gets the height of the fixed banner at the bottom of the page
 */
function getFixedBannerHeight(): number {
  const banner = document.querySelector('[data-fixed-banner]') as HTMLElement;
  return banner ? banner.offsetHeight : 0;
}

export function useDraggable({
  size,
  initialPosition,
  padding = 8,
  disabled = false,
}: DraggableOptions) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const isDragging = useRef(false);
  const wasDragged = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!initialPosition) return;
    setPosition(initialPosition)
  }, [initialPosition, size, padding]);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    isDragging.current = true;
    wasDragged.current = false;

    document.body.style.userSelect = "none";

    startPoint.current = { x: e.clientX, y: e.clientY };

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = Math.abs(e.clientX - startPoint.current.x);
    const deltaY = Math.abs(e.clientY - startPoint.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (!wasDragged.current && distance < 6) return;

    wasDragged.current = true;

    const bannerHeight = getFixedBannerHeight();
    // Add extra spacing above banner when dragging to keep widgets visible
    const spacingAboveBanner = 8;

    const newX = Math.max(
      padding,
      Math.min(window.innerWidth - size - padding, e.clientX - dragOffset.current.x)
    );
    const newY = Math.max(
      padding,
      Math.min(window.innerHeight - size - padding - bannerHeight - spacingAboveBanner, e.clientY - dragOffset.current.y)
    );

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (disabled) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const touch = e.touches[0];
    isDragging.current = true;
    wasDragged.current = false;

    document.body.style.userSelect = "none";
    startPoint.current = { x: touch.clientX, y: touch.clientY };

    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    window.addEventListener("touchmove", handleTouchMove, passiveFalse);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];

    const deltaX = Math.abs(touch.clientX - startPoint.current.x);
    const deltaY = Math.abs(touch.clientY - startPoint.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (!wasDragged.current && distance < 6) return;

    wasDragged.current = true;
    e.preventDefault(); // Block scroll during actual drag

    const bannerHeight = getFixedBannerHeight();
    // Add extra spacing above banner when dragging to keep widgets visible
    const spacingAboveBanner = 8;

    const newX = Math.max(
      padding,
      Math.min(window.innerWidth - size - padding, touch.clientX - dragOffset.current.x)
    );
    const newY = Math.max(
      padding,
      Math.min(window.innerHeight - size - padding - bannerHeight - spacingAboveBanner, touch.clientY - dragOffset.current.y)
    );

    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.body.style.userSelect = "";
    window.removeEventListener("touchmove", handleTouchMove, passiveFalse);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove, passiveFalse);
      window.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
    };
  }, []);

  return {
    position,
    handleMouseDown,
    handleTouchStart,
    wasDragged,
    isDragging: isDragging.current,
  };
}
