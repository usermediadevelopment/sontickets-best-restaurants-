import { createClient } from "next-sanity";


export const client = createClient({
	projectId: "7d9e3dzz",
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: "2024-01-01",
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});
