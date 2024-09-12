"use client";

import React, { useState, useEffect } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Button } from "@/components/ui/button";

interface Images {
  image: (string | StaticImport)[] | undefined;
}

export default function AllImagePreview({ image }: Images) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  useEffect(() => {
    const updateImagesPerPage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 450) {
        setImagesPerPage(1);
      } else if (screenWidth < 640) {
        setImagesPerPage(2);
      } else if (screenWidth < 1024) {
        setImagesPerPage(3);
      } else {
        setImagesPerPage(5);
      }
    };

    updateImagesPerPage();
    window.addEventListener("resize", updateImagesPerPage);

    return () => window.removeEventListener("resize", updateImagesPerPage);
  }, []);

  if (!image) return null;

  const nextImages = () => {
    if (currentIndex + imagesPerPage < image.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevImages = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      <div>
        <Button
          className="bg-card py-0 px-0 w-11 h-11 rounded-full hover:bg-slate-200"
          onClick={prevImages}
          disabled={currentIndex === 0}
        >
          <GrPrevious className="w-7 h-7 text-gray-800" />
        </Button>
      </div>

      <div className="flex justify-center gap-4 overflow-hidden">
        {image
          .slice(currentIndex, currentIndex + imagesPerPage)
          .map((img, index) => (
            <Image
              key={index}
              src={img as string | StaticImport}
              width={imagesPerPage === 1 ? 200 : 150}
              height={imagesPerPage === 1 ? 100 : 100}
              alt={`house image ${currentIndex + index + 1}`}
              className="rounded-sm object-cover"
            />
          ))}
      </div>

      <div>
        <Button
          className="bg-card py-0 px-0 w-11 h-11 rounded-full hover:bg-slate-200"
          onClick={nextImages}
          disabled={currentIndex + imagesPerPage >= image.length}
        >
          <GrNext className="w-7 h-7 text-gray-800" />
        </Button>
      </div>
    </div>
  );
}
