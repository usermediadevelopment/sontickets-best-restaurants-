"use client";

import useGetLocation from "@/hooks/useGetLocation";
import { Badge } from "@/lib/design-system/badge";
import { Button } from "@/lib/design-system/button";
import { Card, CardContent } from "@/lib/design-system/card";

import { ArrowLeft, Heart, Share2, MapPin, Clock, Phone } from "lucide-react";
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
          Ver todos los restaurantes en Bogotá
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col relative">
          <Card className="rounded-lg bg-slate-50  h-auto md:fixed top-40">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md p-1"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Guardar restaurante</span>
                  </Button>
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

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="p-1">
                  Colombiana
                </Badge>
                <Badge variant="secondary" className="p-1">
                  Tradicional
                </Badge>
                <Badge variant="secondary" className="p-1">
                  Económico
                </Badge>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <p className="text-gray-600">{location?.address}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <p className="text-gray-600">Abierto: 7:00 AM - 9:00 PM</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  <p className="text-gray-600">
                    {location?.contact?.phone ?? "000 000 0000"}
                  </p>
                </div>

                <div>
                  <GoogleMapComponent
                    latLng={{
                      lat: location?.geoLocation?.lat ?? 4.60971,
                      lng: location?.geoLocation?.lng ?? -74.08175,
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <Button className="bg-purple-600 text-white px-4 py-2 rounded-[5px] hover:bg-purple-700 transition-colors">
                    Reservar Ahora
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
