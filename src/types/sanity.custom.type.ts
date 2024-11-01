import { Location, Restaurant } from "./sanity";

type Photo = {
  asset: {
    url: string;
  };
};

export type LocationWithRestaurant = Omit<
  Location,
  "restaurant" | "photos" | "restaurant.categories"
> & {
  restaurant?: Restaurant & { logoUrl: string };
  photos: Photo[];
  slug: {
    current: string;
  };
  city: {
    slug: {
      current: string;
    };
  };
};
