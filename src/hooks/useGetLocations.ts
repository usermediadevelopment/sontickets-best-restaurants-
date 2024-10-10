/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";

import { LocationWithRestaurant } from "@/types/sanity.custom.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useGetLocations = () => {
  const [locations, setLocations] = useState<LocationWithRestaurant[]>([]);

  const params = useParams();

  const citySlug = params.city || "todas-ciudades";
  const categorySlug = params.category || "todas-categorias";

  const getLocations = async () => {
    const categoryQuery = `&& 
        "${categorySlug}" in restaurant->categories[]->slug.current`;
    /*     const areaQuery = `&&  area->slug.current == "${areaSlug}"`; */

    const cityQuery = `&& city->slug.current == "${citySlug}"`;
    const LOCATIONS_QUERY = `
        *[
        _type == "location"  ${citySlug && citySlug != "todas-ciudades" ? cityQuery : ""}  ${categorySlug && categorySlug != "todas-categorias" ? categoryQuery : ""}
        ]{
        ...,
        "city": city->{
        ...
        },
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

    //console.log(LOCATIONS_QUERY);

    const locations: LocationWithRestaurant[] =
      await client.fetch(LOCATIONS_QUERY);

    setLocations(locations);
  };

  useEffect(() => {
    getLocations();
  }, [citySlug, categorySlug]);

  return locations;
};

export default useGetLocations;
