"use client";

import useGetLocations from "@/hooks/useGetLocations";
import CardLocationItem from "@/components/CardLocationItem";
import { useParams } from "next/navigation";

export default function IndexPage() {
  const locations = useGetLocations();

  const params = useParams();

  if (params.lang == "pre-registro") {
    return (
      <div className="md:mx-auto">
        <iframe
          className="w-full md:w-[1000px] h-[1000px] md:h-[1000px] mb-20"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdTYd3ccL_hLZCsuN5qF2xQC-DKG5El7uIlOpnRMRe1HWiogQ/viewform?embedded=true"
          height={500}
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mejores Restaurantes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {locations.map((location) => {
          return <CardLocationItem key={location._id} location={location} />;
        })}
      </div>
    </div>
  );
}
