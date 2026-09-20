"use client";

import Image from "next/image";

type FigmaIconProps = {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
};

export function FigmaIcon({ name, size = 24, className = "", alt = "" }: FigmaIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!alt}
    >
      <Image
        src={`/figma/icons/${name}.svg`}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        unoptimized
      />
    </span>
  );
}
