"use client";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import useGetLocations from "@/hooks/useGetLocations";
import Image from "next/image";
import { urlFor } from "@/config/sanity/image";

export default function IndexPage({
  params,
}: {
  params: { city: string; category: string };
}) {
  const citySlug = params.city || "todas-ciudades";
  const categorySlug = params.category || "todas-categorias";

  console.log(citySlug, categorySlug);
  const {
    preferences: { city, category },
  } = useUserPreferences();

  const locations = useGetLocations({
    citySlug,
    categorySlug,
  });

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mejores Restaurantes en {city.name}
      </h2>
      <div
        id="restaurant-feed"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {locations.map((location) => {
          const restaurant = location.restaurant;

          return (
            <div
              key={location._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={location?.photos?.[0]?.asset?.url}
                  alt={`${location.restaurant?.name}`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center shadow-md">
                    <Image
                      src={restaurant?.logoUrl ?? ""}
                      alt={`Logo de`}
                      width={150}
                      height={150}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-end  flex-col h-44">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    {location.restaurant?.name}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {location.restaurant?.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button className="text-purple-600 hover:text-purple-800 transition-colors rounded-[5px] px-3 py-1 border border-purple-600">
                    + Info
                  </button>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-[5px] hover:bg-purple-700 transition-colors">
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
