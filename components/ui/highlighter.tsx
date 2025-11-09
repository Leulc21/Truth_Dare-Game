"use client";

import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "circle";
  color?: string; // accepts hsl(var(--primary)) or a raw color
}

export default function Highlighter({
  children,
  action = "highlight",
  color = "hsl(var(--primary))", // default to ShadCN theme primary
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      // ✅ Get the computed color from CSS variables (so theme mode works)
      const temp = document.createElement("span");
      temp.style.color = color;
      document.body.appendChild(temp);
      const computedColor = getComputedStyle(temp).color;
      document.body.removeChild(temp);

      const annotation = annotate(elementRef.current, {
        type: action === "circle" ? "circle" : "highlight",
        color: computedColor, // now uses resolved theme color
        multiline: true,
        padding: action === "circle" ? 8 : 2,
        iterations: 2,
        animationDuration: 800,
      });

      annotationRef.current = annotation;
      annotation.show();
    }

    return () => {
      annotationRef.current?.remove();
    };
  }, [action, color]);

  return (
    <span ref={elementRef} className="inline-block relative bg-transparent">
      {children}
    </span>
  );
}
