import { Button } from "@/lib/design-system/button";
import { LocationWithRestaurant } from "@/types/sanity.custom.type";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type CardLocationItemProps = {
  location: LocationWithRestaurant;
};

const CardLocationItem = ({ location }: CardLocationItemProps) => {
  const restaurant = location.restaurant;
  const router = useRouter();

  const handleClick = () => {
    const city = location.city?.slug?.current;
    const newPath = `/es/${city}/restaurante/${location?.slug?.current}`;
    router.push(newPath);
  };
  return (
    <div className="w-full">
      <div
        key={location._id}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="relative h-48">
          <Image
            src={
              location?.photos?.[0]?.asset?.url ??
              "https://picsum.photos/600/400"
            }
            alt={`${location.restaurant?.name}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center shadow-md">
              <Image
                src={restaurant?.logoUrl ?? "https://picsum.photos/80/80"}
                alt={`Logo de`}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-end  flex-col h-48">
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              {location.restaurant?.name} - {location.name}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {location.restaurant?.description}
            </p>
          </div>

          <div className="mt-4 flex justify-between">
            <Button className="bg-purple-600 text-white px-4 py-2 rounded-[5px] hover:bg-purple-700 transition-colors">
              Reservar Ahora
            </Button>

            <Button
              onClick={handleClick}
              variant="outline"
              size="icon"
              className="text-purple-600 hover:text-purple-800 transition-colors rounded-[5px] px-3 "
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLocationItem;
