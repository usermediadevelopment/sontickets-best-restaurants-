/* eslint-disable react-hooks/exhaustive-deps */
import { client } from "@/config/sanity/client";
import { Category } from "@/types/sanity";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const CATEGORIES_QUERY = `*[_type == "category"]`;
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const categoriesResponse = await client.fetch(CATEGORIES_QUERY);

      setCategories(categoriesResponse as Category[]);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};
