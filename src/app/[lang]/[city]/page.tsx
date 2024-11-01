"use client";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import useGetLocations from "@/hooks/useGetLocations";
import CardLocationItem from "@/components/CardLocationItem";

import { useState } from "react";

import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function IndexPage() {
  const {
    preferences: { city },
  } = useUserPreferences();

  const [openReservationModal, setOpenReservationModal] =
    useState<boolean>(true);

  const locations = useGetLocations();

  return (
    <div className="px-4 py-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Mejores Restaurantes en {city.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {locations.map((location) => {
          return <CardLocationItem key={location._id} location={location} />;
        })}
      </div>
    </div>
  );
}
