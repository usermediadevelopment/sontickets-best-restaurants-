/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";
import { LocationWithRestaurant } from "@/types/sanity";
import { defineQuery } from "next-sanity";
import { useEffect, useState } from "react";

const useGetLocations = (
  cityId: string = "",
  categoryId: string = "category-casual"
) => {
  const [locations, setLocations] = useState<LocationWithRestaurant[]>([]);

  const getLocations = async () => {
    const LOCATIONS_QUERY = defineQuery(`
        *[
        _type == "location" && 
        city._ref == "${cityId}" && 
        "${categoryId}" in restaurant->categories[]->_id
        ]{
        ...,
        photos[]{
            _key,
            _type,
            asset->{
              _id,
              url
            }
          },
        "restaurant": restaurant->{
            ...,
            "logoUrl": logo.asset->url,
            categories[]->{
            ...
            }
        }
        }
      `);

    console.log(LOCATIONS_QUERY);

    const locations: LocationWithRestaurant[] =
      await client.fetch(LOCATIONS_QUERY);

    console.log(locations);

    setLocations(locations);
  };

  useEffect(() => {
    getLocations();
  }, [cityId, categoryId]);

  return locations;
};

export default useGetLocations;
