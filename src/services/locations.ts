import { client } from "@/config/sanity/client";
import { SLocation } from "@/types/sanity.custom.type";

export const getLocationBySlug = async (locationSlug: string) => {
  const LOCATIONS_QUERY = `
        *[
        _type == "location" && slug.current == "${locationSlug}"
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
        awards[]{
            _key,
            _type,
            asset->{
              _id,
              url
            }
          },
        "restaurant": restaurant->{
            ...,
            "pdfMenuUrl": pdfMenuFile.asset->url,
            "logoUrl": logo.asset->url,
            categories[]->{
            ...
            }
        }
        }
      `;

  const locations: SLocation[] = await client.fetch(LOCATIONS_QUERY);

  return locations?.[0] ?? null;
};
