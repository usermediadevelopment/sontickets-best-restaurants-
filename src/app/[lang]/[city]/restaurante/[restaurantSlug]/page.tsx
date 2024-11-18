"use client";

import useGetLocation from "@/hooks/useGetLocation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Share2,
  MapPin,
  DollarSign,
  SquareMenu,
  CreditCard,
  HandPlatter,
  ChevronDown,
  Home,
  ChevronRight,
  StarIcon,
  Map,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

import GoogleMapComponent from "@/components/GoogleMapComponent";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { use, useMemo, useState } from "react";
import { SLocation } from "@/types/sanity.custom.type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { pdfjs } from "react-pdf";
import { DialogReservation } from "@/components/DialogReservation";
import useGoogleReviews from "@/hooks/useGoogleReviews";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
export default function RestaurantPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const paramsT = use(params);
  const location = useGetLocation(paramsT.restaurantSlug);
  const { setCity, setCategory } = useUserPreferences();

  const [openDialogReservation, setOpenDialogReservation] = useState(false);

  const { rating } = useGoogleReviews({
    placeId: location?.googlePlaceId ?? "",
  });

  const handleNavigate = () => {
    const address = location?.address ?? "";
    let url;

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // iOS devices
      url = "comgooglemaps://?q=" + encodeURIComponent(address);
    } else if (/Android/i.test(navigator.userAgent)) {
      // Android devices
      url = "geo:0,0?q=" + encodeURIComponent(address);
    } else {
      // Other devices (desktop)
      url =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(address);
    }

    window.location.href = url;
  };

  const share = () => {
    const shareData = {
      title: location?.restaurant?.name,
      text: location?.restaurant?.description,
      url: window.location.href,
    };

    navigator
      .share(shareData)
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      trailingZeroDisplay: "stripIfInteger",
    }).format(value);
  };

  const cityPath = useMemo(() => {
    const city = location?.city?.slug?.current ?? "";
    return `/es/${city}`;
  }, [location]);

  const categoryPath = useMemo(() => {
    const city = location?.city?.slug?.current ?? "";
    const category =
      location?.restaurant?.categories?.at(0)?.slug?.current ?? "";
    return `/es/${city}/categoria/${category}`;
  }, [location]);

  const components: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
    },
  };

  return (
    <div className="py-8 bg-gray-100 min-h-screen relative">
      <div className=" visible md:hidden bottom-0  fixed  justify-between items-center w-full bg-[#6000FB] z-10 flex px-5 py-5 gap-2">
        <div className="flex flex-col">
          <span className="text-sm text-white">Asegura tu lugar en</span>
          <span className="tex-md text-white">
            {location?.restaurant?.name}
          </span>
        </div>

        <div>
          <Button
            onClick={() => {
              setOpenDialogReservation(true);
            }}
            className="bg-white hover:bg-white text-[#6000FB]  hover:text-[#6000FB]  px-4 py-2 rounded-[5px] transition-colors"
          >
            Reservar Ahora
          </Button>
        </div>
      </div>
      <div className="flex items-center text-sm container mx-auto my-2  px-4 md:px-0 ">
        <Link href={"/es"}>
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-5 h-5 mx-1 text-gray-500" />
        <Link
          href={cityPath}
          onClick={() => {
            if (location?.city) setCity(location?.city);
          }}
          prefetch
          className="underline"
        >
          <span>{location?.city?.name}</span>
        </Link>

        <ChevronRight className="w-5 h-5 mx-2 text-gray-500" />
        <Link
          href={categoryPath}
          onClick={() => {
            if (location?.restaurant?.categories) {
              setCategory(location?.restaurant?.categories[0]);
            }
          }}
          prefetch
          className="underline"
        >
          <span>{location?.restaurant?.categories?.[0]?.name}</span>
        </Link>
      </div>

      <div className="flex-col ">
        <div className="flex flex-row overflow-auto">
          {location?.photos.map((photo, index) => {
            return (
              <Image
                key={`index-${index}`}
                src={photo?.asset?.url}
                alt={`${location?.restaurant?.name}`}
                width={600}
                height={300}
                style={{
                  width: 600,
                  height: 300,
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row py-5 gap-4 px-5 md:px-0  container mx-auto">
        <div className="basis-full md:basis-10/12">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-md text-gray-500 mb-1">
                  {location?.restaurant?.categories?.at(0)?.name}
                </span>
              </div>

              <div>
                <Button onClick={share} variant={"link"} className="flex">
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold my-1">{location?.name}</h1>
            <div className="flex  text-md flex-col">
              <div className="flex flex-col">
                {rating > 0 && (
                  <span className="flex font-bold items-center mt-1 text-[#6000FB]">
                    <StarIcon className="w-4 h-4 mr-1" />
                    <span className="text-md text-[#6000FB]">{rating}</span>
                    <span className="text-[12px] mx-1"> {"/"}</span>
                    <span className="mr-2 text-[#6000FB]">5</span> Calificación
                    en Google
                  </span>
                )}
                <span className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location?.address}
                </span>

                <span className="flex items-center mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>
                    Desde{" "}
                    <span className="font-bold">
                      {formatCurrency(
                        location?.restaurant?.priceRange?.minPrice ?? 0
                      )}{" "}
                    </span>
                    hasta{" "}
                    <span className="font-bold">
                      {formatCurrency(
                        location?.restaurant?.priceRange?.maxPrice ?? 0
                      )}{" "}
                    </span>
                  </span>
                </span>
              </div>
              <div className="mt-2">
                <div className="flex flex-row gap-1 mt-2 flex-wrap">
                  {location?.outstandingFeatures?.map((item, itemIndex) => (
                    <Badge
                      key={itemIndex}
                      variant="default"
                      className="mr-2 my-1 p-2 py-1 rounded-sm bg-[#6000FB] hover:bg-[#6000FB] "
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col  mt-8">
                <h3 className="font-bold  text-lg">Menú</h3>
                <div className="flex flex-col md:flex-row mt-5 md:items-center">
                  {location?.dietaryPreferences && (
                    <div className="flex">
                      <HandPlatter className="w-4 h-4" />
                      <span className="ml-2 text-md mr-2">
                        Opciones dietéticas
                      </span>
                    </div>
                  )}

                  <div>
                    {location?.dietaryPreferences?.map((item, itemIndex) => (
                      <Badge
                        key={itemIndex}
                        variant="default"
                        className="mr-3 px-2 py-1 my-1 rounded-sm bg-[#6000FB] hover:bg-[#6000FB] "
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Link
                    href={location?.restaurant?.pdfMenuUrl ?? ""}
                    className="underline"
                    target="_blank"
                  >
                    Ver menú
                  </Link>
                </div>
              </div>

              <div className="my-8">
                <h3 className="font-bold  text-lg">Descripción</h3>
                <div className="mt-5">
                  {location?.description && (
                    <PortableText
                      value={location.description}
                      components={components}
                    />
                  )}
                </div>
              </div>

              <CharacteristicsAndServices location={location as SLocation} />
            </div>
          </div>
        </div>
        <div className="md:sticky md:top-[170px]  h-fit ">
          <Card className="rounded-lg bg-slate-50 h-auto md:w-[400px]">
            <CardContent className="p-6 ">
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      setOpenDialogReservation(true);
                    }}
                    className="bg-[#6000FB] hover:bg-[#6000FB] text-white px-4 py-2 rounded-[5px]  transition-colors  hidden md:block"
                  >
                    Reservar Ahora
                  </Button>
                </div>
                <div>
                  <Button
                    variant={"link"}
                    onClick={handleNavigate}
                    className="flex flex-row items-center pl-0"
                  >
                    <h6 className="font-bold f">Cómo llegar</h6>
                    <ArrowRight />
                  </Button>

                  <GoogleMapComponent
                    latLng={{
                      lat: location?.geoLocation?.lat ?? 4.60971,
                      lng: location?.geoLocation?.lng ?? -74.08175,
                    }}
                  />
                  <div className="flex   mt-4">
                    <div className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-green-600" />
                      <span className="text-sm">{location?.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {location && (
        <DialogReservation
          location={location}
          open={openDialogReservation}
          onOpenChange={setOpenDialogReservation}
        />
      )}
    </div>
  );
}

type CharacteristicsAndServicesProps = {
  location: SLocation;
};
const CharacteristicsAndServices = ({
  location,
}: CharacteristicsAndServicesProps) => {
  const services = [
    {
      icon: <HandPlatter className="w-5 h-5" />,
      title: "Servicios",
      count: 2,
      items: location?.facilities ?? [],
    },

    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Métodos de pago aceptados",
      count: 4,
      items: location?.paymentOptions ?? [],
    },
    {
      icon: <SquareMenu className="w-5 h-5" />,
      title: "Otros servicios",
      count: 3,
      items: location?.entertainment ?? [],
    },
  ];

  return (
    <div>
      <h3 className="font-bold text-lg">Características y servicios</h3>
      <div className="mt-5">
        <Accordion type="single" collapsible className="w-full">
          {services.map((service, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className={`${index ? "mt-2" : ""}`}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center w-full">
                  <span className="mr-2">{service.icon}</span>
                  <span>{service.title}</span>

                  <ChevronDown className="ml-4 h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-2 px-6">
                {service.items.map((item, itemIndex) => (
                  <Badge
                    key={itemIndex}
                    variant="default"
                    className="mr-3 my-1 p-2 py-1 rounded-sm bg-[#6000FB] hover:bg-[#6000FB] "
                  >
                    {item}
                  </Badge>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
