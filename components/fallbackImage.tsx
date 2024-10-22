"use client"

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
}

export default function ImageFallback({ src, fallbackSrc, ...rest }: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={rest.alt || 'Image'}
    />
  );
}