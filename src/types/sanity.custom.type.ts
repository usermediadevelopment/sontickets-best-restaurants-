import { Category, City, Location, Restaurant } from "./sanity";

export type Asset = {
  asset: {
    url: string;
  };
};

export type LocationWithRestaurant = Omit<
  Location,
  "restaurant" | "photos" | "restaurant.categories"
> & {
  restaurant?: Restaurant & { logoUrl: string };
  photos: Asset[];
  slug: {
    current: string;
  };
  city: {
    slug: {
      current: string;
    };
  };
};

export interface SRestaurant extends Omit<Restaurant, "categories"> {
  logoUrl: string;
  categories?: SCategory[];
  pdfMenuUrl: string;
}

export interface SCategory extends Category {
  iconUrl: string;
}

export interface SCity extends City {
  another: string;
}

export interface SLocation
  extends Omit<
    Location,
    "restaurant" | "photos" | "restaurant.categories" | "city" | "awards"
  > {
  restaurant: SRestaurant | undefined;
  city?: SCity | undefined;
  photos: Asset[] | [];
  awards: Asset[] | [];
}
