// REMOVE "use client" -- this file is SSR by default!

import React from "react";
import { cn } from "@/lib/utils";
import HeaderSection from "../util/header-section";
import { LogoCloudSectionProps, LogoImage } from "@/lib/types";
import LogoCloudSlider from "../client/logo-cloud-slider";

export default function LogoCloudSection({
  section
}: {
  section: LogoCloudSectionProps
}) {
  const {
    childImage,
    content,
    textAlign,
    layoutType,
    primaryButton,
    textColor,
    secondaryButton,
    columnNumber,
    autoplay,
    autoplaySpeed,
    duration
  } = section || {};

  const renderContent = (
    <div className="mb-12" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  );

  const renderLogo = (image: LogoImage, index: number) => (
    <div key={index} className="flex items-center justify-center p-4">
      <img
        src={image.asset.url || "/placeholder.svg"}
        alt={image.asset.altText}
        width={200}
        height={48}
        loading="lazy"
        className="max-w-full h-auto object-contain"
      />
    </div>
  );

  const renderLogos = () => {
    switch (layoutType) {
      case "slider":
        return (
          <LogoCloudSlider
            images={childImage}
            columnNumber={columnNumber}
            autoplay={autoplay}
            duration={duration}
            autoplaySpeed={autoplaySpeed}
          />
        );
      case "grid":
      default:
        return (
          <div
            className={cn("grid gap-8", {
              "grid-cols-3 sm:grid-cols-3": columnNumber === 3,
              "grid-cols-2 sm:grid-cols-4": columnNumber === 4,
              "grid-cols-3 sm:grid-cols-5": columnNumber === 5,
              "grid-cols-3 sm:grid-cols-6": columnNumber === 6,
            })}
          >
            {childImage.map((image, index) => renderLogo(image, index))}
          </div>
        );
    }
  };

  return (
    <section>
      <div>
        {content && renderContent}
        <div className={cn("mx-auto", content && "mt-10")}>
          {renderLogos()}
        </div>
      </div>
    </section>
  );
}
