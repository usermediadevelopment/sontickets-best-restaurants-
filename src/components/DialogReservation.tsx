"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocationWithRestaurant } from "@/types/sanity.custom.type";
import { useEffect } from "react";

type DialogReservationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: LocationWithRestaurant;
};

export const DialogReservation = ({
  open,
  onOpenChange,
  location,
}: DialogReservationProps) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{location?.restaurant?.reservationUrl}</DialogTitle>
          <DialogDescription>
            {"Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <iframe
            title="reservas"
            src="https://app.sontickets.com/form/dellanonna-Iocd?lang=es&amp;from=dellanonna"
            height="700"
            width="100%"
          ></iframe>
        </div>
        <DialogFooter>
          <Button type="submit">Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
