"use client"

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | null;
  fallbackSrc: string;
}

export default function ImageFallback({ src, fallbackSrc, ...rest }: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  useEffect(() => {
    if (src != null) {
      setImgSrc(src);
    }
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc || fallbackSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={rest.alt || 'Image'}
    />
  );
}