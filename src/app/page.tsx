"use client";
import { defineQuery, FilteredResponseQueryOptions } from "next-sanity";

import { client } from "@/config/sanity/client";
import { LocationWithRestaurant } from "@/types/sanity";
import { useEffect, useState } from "react";

const options: FilteredResponseQueryOptions = {
  next: {
    revalidate: 60,
  },
};

const LOCATIONS_QUERY = defineQuery(`
	*[_type == "location" && city._ref == "city-portside"]{
	...,
	 "restaurant": restaurant-> {
			_id,
			name,
			description,
			// Add other fields you need from the restaurant document
	   }
	}
  `);

const IndexPage = () => {
  const [locations, setLocations] = useState<LocationWithRestaurant[]>([]);

  const getLocations = async () => {
    const locations: LocationWithRestaurant[] = await client.fetch(
      LOCATIONS_QUERY,
      {},
      options
    );
    setLocations(locations);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      {locations.map((location) => {
        const restaurant = location.restaurant;
        return (
          <div key={location._id}>
            {restaurant?.name}
            <div>{location.address}</div>
            {location.name}
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
