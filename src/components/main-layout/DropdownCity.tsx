/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { ChevronDown, MapPin } from "lucide-react";

import { useCities } from "@/hooks/useCities";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useParams, useRouter } from "next/navigation";

import _ from "lodash";

import { SCity } from "@/types/sanity.custom.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function DropdownCity() {
  const cities = useCities();

  const router = useRouter();
  const params = useParams();

  const {
    preferences: { city, category },
    setCity,
  } = useUserPreferences();

  const citySelected = useMemo(() => {
    return cities.find((c) => c._id === city._id);
  }, [cities, city]);

  const handleCityChange = (city: SCity) => {
    setCity(city);
    let newPath = `/es/${city?.slug?.current}`;
    if (params.category) {
      newPath = `/es/${city?.slug?.current}/categoria/${params.category}`;
    }

    router.push(newPath);
  };

  useEffect(() => {
    if (cities.length > 0 && params.city) {
      const cityFound = cities.find((c) => {
        return (
          _.deburr(c.name?.toLowerCase()) ==
          (params.city as string).toLowerCase()
        );
      });

      if (cityFound) {
        setCity(cityFound);
      }
    }
  }, [cities, params.city]);

  useEffect(() => {
    if (cities.length > 0 && !category) {
      setCity(cities[0]);
    }
  }, [cities, category]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center md:px-3 py-2 text-sm border rounded-[5px]"
        >
          <MapPin size={16} className="md:mr-2" />
          <span>
            {citySelected?.name ??
              _.capitalize((params?.city as string) ?? "") ??
              "Ciudad"}
          </span>
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-white ">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city._id}
            onSelect={() => handleCityChange(city)}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            {city.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
