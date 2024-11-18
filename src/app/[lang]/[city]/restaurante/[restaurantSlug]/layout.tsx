import { getLocationBySlug } from "@/services/locations";
import { Metadata } from "next";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export type Props = {
  params: { restaurantSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: never): Promise<Metadata> {
  // read route params
  const { restaurantSlug } = await params;

  const location = await getLocationBySlug(restaurantSlug);

  return {
    title: location?.name,
    description: location?.description,
    openGraph: {
      images: location?.photos?.[0].asset.url,
    },
  };
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
