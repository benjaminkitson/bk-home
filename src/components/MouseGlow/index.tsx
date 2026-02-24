"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 40;
const MAX_SIZE = 220;
const MIN_SIZE = 40;
const MAX_ALPHA = 0.1;
const MIN_ALPHA = 0.005;
const DECAY_INTERVAL = 30;

interface Point {
  x: number;
  y: number;
}

function buildBackground(trail: Point[]): string {
  if (trail.length === 0) return "none";

  return trail
    .map((point, i) => {
      const t = i / Math.max(trail.length - 1, 1);
      const eased = t * t;
      const size = Math.round(MAX_SIZE - eased * (MAX_SIZE - MIN_SIZE));
      const alpha = (MAX_ALPHA - eased * (MAX_ALPHA - MIN_ALPHA)).toFixed(3);
      return `radial-gradient(${size}px circle at ${point.x}px ${point.y}px, rgba(67, 56, 202, ${alpha}), transparent 70%)`;
    })
    .join(", ");
}

export function MouseGlow() {
  const [background, setBackground] = useState("none");
  const [visible, setVisible] = useState(false);
  const trailRef = useRef<Point[]>([]);
  const raf = useRef(0);
  const decayTimer = useRef<ReturnType<typeof setInterval>>();

  const renderTrail = useCallback(() => {
    setBackground(buildBackground(trailRef.current));
  }, []);

  const startDecay = useCallback(() => {
    if (decayTimer.current) return;
    decayTimer.current = setInterval(() => {
      const trail = trailRef.current;
      if (trail.length === 0) {
        clearInterval(decayTimer.current);
        decayTimer.current = undefined;
        setBackground("none");
        return;
      }
      trail.pop();
      renderTrail();
    }, DECAY_INTERVAL);
  }, [renderTrail]);

  const stopDecay = useCallback(() => {
    if (decayTimer.current) {
      clearInterval(decayTimer.current);
      decayTimer.current = undefined;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      stopDecay();
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const trail = trailRef.current;
        trail.unshift({ x: e.clientX, y: e.clientY });
        if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH;
        renderTrail();
      });
    },
    [stopDecay, renderTrail],
  );

  const handleMouseStop = useCallback(() => {
    startDecay();
  }, [startDecay]);

  useEffect(() => {
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    if (!isPointer) return;

    setVisible(true);

    let stopTimeout: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      clearTimeout(stopTimeout);
      handleMouseMove(e);
      stopTimeout = setTimeout(handleMouseStop, 80);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(raf.current);
      if (decayTimer.current) clearInterval(decayTimer.current);
    };
  }, [handleMouseMove, handleMouseStop]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ background }}
      aria-hidden
    />
  );
}
