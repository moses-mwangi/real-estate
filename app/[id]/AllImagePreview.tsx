"use client";

import React, { useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Button } from "@/components/ui/button";

interface Images {
  image: (string | StaticImport)[] | undefined;
}

export default function AllImagePreview({ image }: Images) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesPerPage = 5;

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
    <div className="flex gap-7 justify-center items-center pt-4">
      <div>
        <Button
          className="bg-card py-0 px-0 w-11 h-11 rounded-full hover:bg-slate-200"
          onClick={prevImages}
          disabled={currentIndex === 0}
        >
          <GrPrevious className="w-7 h-7 text-gray-800" />
        </Button>
      </div>

      <div className="flex gap-4">
        {image
          .slice(currentIndex, currentIndex + imagesPerPage)
          .map((img, index) => (
            <Image
              key={index}
              src={img as string | StaticImport}
              width={150}
              height={100}
              alt={`house image ${currentIndex + index + 1}`}
              className="rounded-sm w-40 h-24"
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
