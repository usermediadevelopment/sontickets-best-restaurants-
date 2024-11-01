/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";
import { City } from "@/types/sanity";
import { useEffect, useState } from "react";

export const useCities = () => {
  const CITIES_QUERY = `*[_type == "city"]`;
  const [cities, setCities] = useState<City[]>([]);

  const getCities = async () => {
    try {
      const citiesResponse = await client.fetch(CITIES_QUERY);

      setCities(citiesResponse as City[]);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return cities;
};
