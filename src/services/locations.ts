import { client } from "@/config/sanity/client";
import { LocationWithRestaurant } from "@/types/sanity.custom.type";

export const getLocationBySlug = async (locationSlug: string) => {
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

  const locations: LocationWithRestaurant[] =
    await client.fetch(LOCATIONS_QUERY);

  return locations?.[0] ?? null;
};
