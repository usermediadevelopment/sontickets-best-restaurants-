import ClientComponent from "@/components/ClientComponent";
import { getLocationBySlug } from "@/services/locations";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  // read route params

  const location = await getLocationBySlug(slug as string);

  return {
    alternates: {
      canonical: `https://mejoresrestaurantes.co/es/medellin/restaurante/${location?.slug?.current}`,
    },
    title: location.seo?.metaTitle,
    description: location.seo?.metaDescription,
    openGraph: {
      images: [
        {
          url: location?.photos?.[0].asset.url, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: Props): Promise<React.ReactNode> {
  const { slug } = await params;
  const restaurant = await getLocationBySlug(slug as string);

  return (
    <div className="mt-64">
      <h1>{restaurant.name}</h1>
      <p>{restaurant.postalCode}</p>
      <ClientComponent />
    </div>
  );
}
