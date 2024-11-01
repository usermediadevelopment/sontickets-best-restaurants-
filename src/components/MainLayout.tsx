/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { Search, ChevronDown, MapPin, Instagram } from "lucide-react";

import { useCities } from "@/hooks/useCities";
import { useCategories } from "@/hooks/useCategories";
import { Category, City } from "@/types/sanity";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import _ from "lodash";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cities = useCities();
  const categories = useCategories();
  const router = useRouter();
  const params = useParams();

  const {
    preferences: { city, category },
    setCity,
    setCategory,
  } = useUserPreferences();

  const citySelected = useMemo(() => {
    return cities.find((c) => c._id === city._id);
  }, [cities, city]);

  const handleCityChange = (city: City) => {
    setCity(city);
    let newPath = `/es/${city?.slug?.current}`;
    if (params.category) {
      newPath = `/es/${city?.slug?.current}/categoria/${params.category}`;
    }

    router.push(newPath);
  };

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
    const newPath = `/es/${params.city || "todas-ciudades"}/categoria/${
      category?.slug?.current
    }`;
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

      console.log("cityFound", cityFound);
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
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 z-50 fixed w-full">
        <div className="px-4 md:px-20 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png" // Adjust the path if you placed the image in a subdirectory
                alt="Logo"
                width={140}
                height={100}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              />

              <div className="relative hidden md:block">
                <Input
                  type="search"
                  placeholder="Buscar restaurantes o platos"
                  className="pl-10 pr-4 py-2 w-[450px] hidden"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden"
                  size={18}
                />
              </div>
            </div>
            <div className="flex  justify-end space-x-2">
              <Sheet>
                <SheetTrigger asChild></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <Button
                      onClick={() => {
                        window.open("https://app.sontickets.com/", "_blank");
                      }}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      Iniciar sesión
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center px-3 py-2 text-sm border rounded-[5px]"
                  >
                    <MapPin size={16} className="mr-2" />
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

              <Button
                onClick={() => {
                  window.open("https://app.sontickets.com/", "_blank");
                }}
                variant="outline"
                className="hidden md:inline-flex px-3 py-2 text-sm text-[#6000FB] border border-[#6000FB] rounded-[5px]"
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
        {!params.restaurantSlug && params?.lang != "pre-registro" && (
          <nav className="bg-gray-50" aria-label="Filtros de búsqueda">
            <div className="container mx-auto px-4 py-4 overflow-x-auto">
              <div className="flex space-x-6 min-w-max">
                {categories.map((cat, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleCategoryChange(cat)}
                      className="flex flex-col items-center space-y-1 focus:outline-none group"
                    >
                      <Image
                        src={cat?.iconUrl ?? "https://picsum.photos/80/80"}
                        alt={`Logo de`}
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                      <span
                        className={`text-sm ${
                          cat._id === category._id
                            ? "text-[#6000FB]"
                            : "text-gray-600"
                        } group-hover:text-[#6000FB] transition-colors`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        )}
      </header>

      <main
        className={`flex bg-gray-100 min-h-screen flex-col ${
          params.restaurantSlug
            ? "pt-20"
            : params.lang == "pre-registro"
              ? "pt-40"
              : "pt-52"
        }`}
      >
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">mejoresrestaurantes.co</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Términos y Condiciones
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Política de Privacidad
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors flex items-center"
              >
                <Instagram size={20} className="mr-2" />
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}