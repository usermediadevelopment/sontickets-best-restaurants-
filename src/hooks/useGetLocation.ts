/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";
import { LocationWithRestaurant } from "@/types/sanity.custom.type";
import { useEffect, useState } from "react";

const useGetLocation = (locationSlug: string) => {
  const [location, setLocation] = useState<LocationWithRestaurant>();

  const getLocation = async () => {
    const LOCATIONS_QUERY = `
        *[
        _type == "location" && slug.current == "${locationSlug}"
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

    setLocation(locations?.[0]);
  };

  useEffect(() => {
    getLocation();
  }, [locationSlug]);

  return location;
};

export default useGetLocation;
