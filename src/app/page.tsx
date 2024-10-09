import { defineQuery, FilteredResponseQueryOptions } from "next-sanity";

import { client } from "@/config/sanity/client";
import { Restaurant } from "@/types/sanity";

const options: FilteredResponseQueryOptions = {
  next: {
    revalidate: 60,
  },
};

const RESTAURANTS_QUERY = defineQuery(`*[_type == "restaurant" ]`);
const CITIES_QUERY = defineQuery(`*[_type == "city" ]`);
export default async function IndexPage() {
  const restaurants: Restaurant[] = await client.fetch(
    RESTAURANTS_QUERY,
    {},
    options
  );

  const cities = await client.fetch(CITIES_QUERY, {}, options);
  console.log("citiesdf ", cities);

  return (
    <div>
      {restaurants.map((restaurant) => {
        return <div key={restaurant._id}>{restaurant.name}</div>;
      })}
    </div>
  );
}
