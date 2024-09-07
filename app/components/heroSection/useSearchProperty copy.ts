"use client";

import { useRouter } from "next/navigation";
import useProperty from "../properties/useProperty";

function useSearchProperty() {
  const router = useRouter();
  const { properties } = useProperty();

  const onSubmit = (data: any) => {
    let filteredProperties = properties;

    // Apply filters dynamically based on selected fields
    if (data.price) {
      filteredProperties = filteredProperties?.filter(
        (property) => property.price <= data.price
      );
    }
    if (data.bathrooms) {
      filteredProperties = filteredProperties?.filter(
        (property) => property.bathrooms >= data.bathrooms
      );
    }
    if (data.bedrooms) {
      filteredProperties = filteredProperties?.filter(
        (property) => property.bedrooms >= data.bedrooms
      );
    }
    if (data.category) {
      filteredProperties = filteredProperties?.filter(
        (property) => property.type === data.category
      );
    }
    if (data.city) {
      filteredProperties = filteredProperties?.filter(
        (property) => property.city === data.city
      );
    }

    // When no filters are applied, return all properties
    const selectedProperties = filteredProperties.length
      ? filteredProperties
      : properties;

    // Push query params to the URL
    router.push(
      `/search?city=${data.city || ""}&price=${data.price || ""}&bathrooms=${
        data.bathrooms || ""
      }&bedrooms=${data.bedrooms || ""}&category=${data.category || ""}`
    );
  };

  return { properties, onSubmit };
}

export default useSearchProperty;
