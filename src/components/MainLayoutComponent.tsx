import { getCategories } from "@/services/categories";
import Image from "next/image";
import { Input } from "./ui/input";
import { MenuIcon, Search } from "lucide-react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CategoryList from "./main-layout/CategoryList";
import DropdownCity from "./main-layout/DropdownCity";

export default async function MainLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  console.log("categories:", categories);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 z-50 fixed w-full">
        <div className="flex items-center justify-between py-6 container mx-auto px-4  ">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png" // Adjust the path if you placed the image in a subdirectory
              alt="Logo"
              width={140}
              height={100}
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
          <div className="flex flex-row items-center justify-end space-x-2">
            <DropdownCity />

            <Button
              variant="outline"
              className="hidden md:inline-flex px-3 py-2 text-sm text-[#6000FB] border border-[#6000FB] rounded-[5px]"
            >
              Iniciar sesión
            </Button>

            <Button
              variant="outline"
              className="hidden md:inline-flex px-3 py-2 text-sm text-[#6000FB] border border-[#6000FB] rounded-[5px]"
            >
              Registro restaurantes
            </Button>

            <Sheet>
              <SheetTrigger className="md:hidden cursor-pointer" asChild>
                <MenuIcon className="w-8 h-8" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4 flex flex-col gap-y-2">
                  <SheetTrigger asChild>
                    <Button
                      onClick={() => {
                        window.open("https://app.sontickets.com/", "_blank");
                      }}
                      variant="outline"
                      className="px-3 py-2 text-sm text-[#6000FB] border border-[#6000FB] rounded-[5px]"
                    >
                      Iniciar sesión
                    </Button>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-3 py-2 text-sm text-[#6000FB] border border-[#6000FB] rounded-[5px]"
                    >
                      Registro restaurantes
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <CategoryList categories={categories} />
      </header>

      <main className={`flex bg-gray-100 min-h-screen flex-col pt-20`}>
        {children}
      </main>
    </div>
  );
}
