import { Metadata } from "next";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export type Props = {
  params: { restaurantSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mejores Restaurantes",
    description: "Descubre los mejores restaurantes de tu ciudad",
  };
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
