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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-[600px] pb-10 md:pb-5">
        <DialogHeader>
          <DialogTitle className="text-lg">{location?.name}</DialogTitle>
          <DialogDescription className="hidden">
            {
              "Reserva tu mesa y ven a disfrutar de un momento especial. Buen ambiente, sabores únicos y un lugar esperando por ti."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <iframe
            title="reservas"
            src={location.restaurant?.reservationUrl}
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