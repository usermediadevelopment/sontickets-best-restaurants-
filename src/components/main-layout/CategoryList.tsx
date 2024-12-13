"use client";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import { SCategory } from "@/types/sanity.custom.type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type CategoryListProps = {
  categories: SCategory[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  const params = useParams();
  const {
    preferences: { category },

    setCategory,
  } = useUserPreferences();

  const router = useRouter();

  const handleCategoryChange = (category: SCategory) => {
    setCategory(category);
    const newPath = `/es/${params.city || "todas-ciudades"}/categoria/${
      category?.slug?.current
    }`;
    router.push(newPath);
  };

  return (
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
  );
}
