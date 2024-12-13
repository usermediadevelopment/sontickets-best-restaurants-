import { getCityBySlug } from "@/services/cities";
import { Metadata } from "next";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export type Props = {
  params: { city: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityFound = await getCityBySlug(citySlug);
  console.log("cityFound", cityFound);
  return {
    title: "Mejores restaurantes en " + cityFound.name,
    description: cityFound.description,
    openGraph: {
      images: [
        {
          url: cityFound?.image?.asset?.url ?? "",
          width: 800,
          height: 600,
          alt: cityFound.name,
        },
      ],
    },
  };
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
