"use client";

import OptimizedImage from "@/components/common/OptimizedImage";
import { ImageSectionType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";

interface ImageSectionProps {
  data: ImageSectionType;
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { desc, header, buttonText, src, alt } = data;

  return (
    <section className="relative w-screen -mx-5">
      {/* Full-screen background image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <OptimizedImage
          src={src}
          alt={alt || "background image"}
          fill
          className="object-cover"
          style={{
            objectPosition: "top",
          }}
        />
      </div>

      {/* Centered content container */}
      <div className="relative flex flex-col items-center justify-center text-center space-y-5 px-5 py-14  max-w-screen-sm md:max-w-screen-md mx-auto">
        {/* Optional Icon */}
        {buttonText && (
            <OptimizedImage
              src="/favicon.ico"
              alt="Level Up image"
              width={80}
              height={80}
              className="object-contain w-[80px] h-auto"
            />
        )}

        {/* Header and Description */}
        <div className="space-y-3 text-white">
          <h2 style={{ textShadow: '2px 6px 4px rgba(0, 0, 0, 1)' }} className="text-2xl lg:text-3xl font-bold">{header}</h2>
          <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 1)' }} className="lg:text-lg">{desc}</p>
        </div>

        {/* Button */}
        {buttonText && (
          <div className="w-full max-w-xs">
            <Button
              onClick={() => scrollToSection("floating-form")}
              className="bg-purple-800 w-full text-white hover:bg-purple-900 text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-2.5 h-auto whitespace-normal break-words"
              aria-label={buttonText}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageSection;
