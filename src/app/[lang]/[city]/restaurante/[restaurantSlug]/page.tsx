"use client";

import useGetLocation from "@/hooks/useGetLocation";
import { Button } from "@/lib/design-system/button";
import { Card, CardContent } from "@/lib/design-system/card";

import { ArrowLeft, Share2, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GoogleMapComponent from "@/components/GoogleMapComponent";

export default function RestaurantPage({
  params,
}: {
  params: { restaurantSlug: string };
}) {
  const router = useRouter();
  const location = useGetLocation(params.restaurantSlug);

  return (
    <div className="max-w-7xl mx-5 lg:mx-40 py-8 bg-gray-100 min-h-screen">
      <div className="flex gap-2 items-center mb-4">
        <Button
          variant="outline"
          size={"icon"}
          className="text-primary px-2 py-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-primary">
          Ver todos los restaurantes
        </span>
      </div>
      <div className="flex flex-col md:flex-row  gap-5">
        <div className="flex flex-col md:flex-grow gap-2">
          <div className="relative h-96 rounded-lg">
            <Image
              src={
                location?.photos?.[0]?.asset?.url ??
                "https://picsum.photos/600/400"
              }
              className="rounded-lg"
              alt={`${location?.restaurant?.name}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mt-2">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={
                  location?.restaurant?.logoUrl ?? "https://picsum.photos/80/80"
                }
                alt={`Logo de`}
                width={50}
                height={50}
                className="rounded-full"
              />

              <h1 className="text-3xl font-bold">
                {location?.restaurant?.name} - {location?.name}
              </h1>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            {location?.restaurant?.description}
          </p>
        </div>
        <div className="flex flex-col md:w-[300px]">
          <Card className="rounded-lg bg-slate-50 flex h-auto md:fixed  md:w-[300px]  top-40 ">
            <CardContent className="p-6  w-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-2">
                
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md p-1"
                    onClick={() => {
                      const shareData = {
                        title: "Check out this restaurant!",
                        text: "I found this amazing restaurant on mejoresrestaurantes.co",
                        url: window.location.href,
                      };

                      navigator
                        .share(shareData)
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing", error));
                    }}
                  >
                    <Share2 className="h-4 w-4 " />
                    <span className="sr-only">Compartir restaurante</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <p className="text-gray-600">{location?.address}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <div className="p-4">
                    <ul className="space-y-2">
                      {location?.schedule?.map((hour) => (
                        <li key={hour.day} className="flex justify-between">
                          <span className="font-medium">{hour.day}</span>
                          <span>{hour.day}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Button className="bg-purple-600 text-white px-4 py-2 rounded-[5px] hover:bg-purple-700 transition-colors">
                    Reservar Ahora
                  </Button>
                </div>
                <div>
                  <GoogleMapComponent
                    latLng={{
                      lat: location?.geoLocation?.lat ?? 4.60971,
                      lng: location?.geoLocation?.lng ?? -74.08175,
                    }}
                  />
                </div>

      
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
