"use client";

import React, { useEffect, useState } from "react";
import useSearchProperty from "../components/heroSection/useSearchProperty";
import { useSearchParams } from "next/navigation";
import PropertyFound from "./PropertyFound";
import PropertyNotFoundView from "./PropertyNotFoundView";

export default function Searching() {
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);
  const { properties } = useSearchProperty();
  const searchParams = useSearchParams();

  useEffect(() => {
    setNextImageIndexes(Array(properties.length).fill(0));
  }, [properties]);

  const handleNextImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) => (i === index ? (value + 1) % imageCount : value))
    );
  };

  const handlePreviousImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) =>
        i === index ? (value - 1 + imageCount) % imageCount : value
      )
    );
  };

  const price = searchParams.get("price");
  const bathrooms = searchParams.get("bathrooms");
  const bedrooms = searchParams.get("bedrooms");
  const type = searchParams.get("category");
  const city = searchParams.get("city");

  const filteredProperties = properties?.filter((property) => {
    return (
      (!price ||
        (property.price <= Number(price) &&
          property.price > Number(price) - 10000000)) &&
      (!bathrooms || property.bathrooms === Number(bathrooms)) &&
      (!bedrooms || property.bedrooms === Number(bedrooms)) &&
      (!type || property.type === type) &&
      (!city || property.city === city)
    );
  });

  const selectedProperties = filteredProperties?.length
    ? filteredProperties
    : [];

  const proper = properties?.filter((property) => {
    return (
      !price ||
      (property.price <= Number(price) &&
        property.price > Number(price) - 10000000)
    );
  });

  return (
    <div className="">
      {selectedProperties.length !== 0 ? (
        <PropertyFound
          filteredProperties={filteredProperties}
          handlePreviousImage={handlePreviousImage}
          handleNextImage={handleNextImage}
          nextImageIndexes={nextImageIndexes}
        />
      ) : (
        <PropertyNotFoundView
          handlePreviousImage={handlePreviousImage}
          handleNextImage={handleNextImage}
          nextImageIndexes={nextImageIndexes}
        />
      )}
    </div>
  );
}
