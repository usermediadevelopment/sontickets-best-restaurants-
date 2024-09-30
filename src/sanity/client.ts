import { createClient } from "next-sanity";

export const client = createClient({
	projectId: "7d9e3dzz",
	dataset: "production",
	apiVersion: "2024-01-01",
	useCdn: false,
});
