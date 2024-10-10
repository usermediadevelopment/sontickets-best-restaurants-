"use client";

import useGetLocations from "@/hooks/useGetLocations";
import CardLocationItem from "@/components/CardLocationItem";

export default function IndexPage() {
  const locations = useGetLocations();

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mejores Restaurantes
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {locations.map((location) => {
          return <CardLocationItem key={location._id} location={location} />;
        })}
      </div>
    </div>
  );
}
