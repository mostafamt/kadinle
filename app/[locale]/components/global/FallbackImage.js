"use client";
import Image from "next/image";
import { useState } from "react";

const FallbackImage = ({
  src,
  alt,
  width,
  height,
  containerClassName,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{ width, height }} className={containerClassName}>
      {imageError && (
        <div className="h-full w-full flex items-center justify-center">
          <span className="capitalize">{alt?.[0]}</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onError={(err) => {
          setImageError(true);
        }}
        // onLoad={handleImageLoad}
        style={{ display: !imageError ? "block" : "none" }}
        {...props}
      />
    </div>
  );
};

export default FallbackImage;
