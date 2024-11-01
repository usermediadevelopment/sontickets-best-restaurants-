/* eslint-disable react-hooks/exhaustive-deps */

import { getLocationBySlug } from "@/services/locations";
import { LocationWithRestaurant } from "@/types/sanity.custom.type";
import { useEffect, useState } from "react";

const useGetLocation = (locationSlug: string) => {
  const [location, setLocation] = useState<LocationWithRestaurant>();

  const getLocation = async () => {
    const location = await getLocationBySlug(locationSlug);
    setLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, [locationSlug]);

  return location;
};

export default useGetLocation;
