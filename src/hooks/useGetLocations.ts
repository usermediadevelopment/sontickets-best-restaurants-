/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";
import { Area, Category, City, LocationWithRestaurant } from "@/types/sanity";
import { defineQuery } from "next-sanity";
import { useEffect, useState } from "react";

type UseGetLocationsProps = {
  citySlug: string;
  areaSlug?: string;
  categorySlug: string;
};

const useGetLocations = ({
  citySlug,
  areaSlug,
  categorySlug,
}: UseGetLocationsProps) => {
  const [locations, setLocations] = useState<LocationWithRestaurant[]>([]);

  const getLocations = async () => {
    const categoryQuery = `&& 
        "${categorySlug}" in restaurant->categories[]->slug.current`;
    const areaQuery = `&&  area->slug.current == "${areaSlug}"`;

    const cityQuery = `&& city->slug.current == "${citySlug}"`;
    const LOCATIONS_QUERY = `
        *[
        _type == "location"  ${citySlug && citySlug != "todas-ciudades" ? cityQuery : ""}  ${categorySlug && categorySlug != "todas-categorias" ? categoryQuery : ""}
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
      `;

    console.log(LOCATIONS_QUERY);

    const locations: LocationWithRestaurant[] =
      await client.fetch(LOCATIONS_QUERY);

    console.log(locations);

    setLocations(locations);
  };

  useEffect(() => {
    getLocations();
  }, [citySlug, categorySlug]);

  return locations;
};

export default useGetLocations;
