"use client";

import axios from "axios";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Property {
  _id: string;
  image: (string | StaticImport)[];
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  createdAt: Date;
  price: number;
  city: string;
  zipcode: number;
  address: string;
  position: [number];
  userId: [{ photo: string; name: string }];
  size: number;
}

function useProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      const propety = await axios.get(
        "https://real-estate-api-azure.vercel.app/api/property"
      );
      setProperties(propety.data.data);
      setNextImageIndexes(Array(propety.data.data.length).fill(0));
    }

    fetchAgents();
  }, []);

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

  return { properties, nextImageIndexes, handleNextImage, handlePreviousImage };
}

export default useProperty;
