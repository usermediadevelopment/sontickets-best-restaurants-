import { client } from "@/config/sanity/client";
import { SCategory } from "@/types/sanity.custom.type";

const CATEGORIES_QUERY = `*[_type == "category"]{
    ...,
    "iconUrl": icon.asset->url
}`;

export const getCategories = async () => {
  try {
    const categoriesResponse = await client.fetch(CATEGORIES_QUERY);
    console.log(categoriesResponse);
    return categoriesResponse as SCategory[];
  } catch (err) {
    console.error("Error fetching cities:", err);
    return [];
  }
};
