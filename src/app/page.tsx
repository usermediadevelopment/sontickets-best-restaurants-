import Link from "next/link";
import { defineQuery, FilteredResponseQueryOptions } from "next-sanity";

import { client } from "@/config/sanity/client";
import {
	Key,
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
	AwaitedReactNode,
} from "react";
import { CloudSnow } from "lucide-react";
import { Cuisine, Restaurant } from "@/types/sanity";

const options: FilteredResponseQueryOptions = {
	next: {
		revalidate: 60,
	}
};

const RESTAURANTS_QUERY = defineQuery(`*[_type == "restaurant" ]`);
const CUISINE_QUERY = defineQuery(`*[_type == "cuisine" ]`);

export default async function IndexPage() {
	const restaurants: Restaurant[] = await client.fetch(RESTAURANTS_QUERY, {}, options);
	const cuisines: Cuisine[] = await client.fetch(CUISINE_QUERY, {}, options);
	console.log("cuisines", cuisines);
	console.log("restaurants", restaurants);



	return (
		<div >
			{restaurants.map((restaurant) => {
				return (
					<div>{restaurant.name}</div>
				);
			})
			}


		</div>
	);
}
