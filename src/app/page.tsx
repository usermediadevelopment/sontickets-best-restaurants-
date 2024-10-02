import Link from "next/link";
import { defineQuery } from "next-sanity";

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

const options = { next: {} };

const RESTAURANTS_QUERY = defineQuery(`*[_type == "restaurant" ]`);

export default async function IndexPage() {
	const restaurants = await client.fetch(RESTAURANTS_QUERY, {}, options);
	console.log("restaurants", restaurants);



	return (
		<div >
			{restaurants.map((restaurant) => {
				return (
					<Link key={restaurant._id} href={`/restaurants`}>
						<a>
							{restaurant.name}
						</a>
					</Link>
				);
			})
			}


		</div>
	);
}
