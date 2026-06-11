import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Stand } from "@/features/stands/types/stand.types";
import { Button } from "../ui/button";

interface StandDetailsDrawerProps {
  stand: Stand | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  available: { label: "Available", className: "bg-green-100 text-green-800" },
  reserved: { label: "Reserved", className: "bg-yellow-100 text-yellow-800" },
  booked: { label: "Booked", className: "bg-red-100 text-red-800" },
};

export const StandDetailsDrawer = ({
  stand,
  isOpen,
  onClose,
}: StandDetailsDrawerProps) => {
  if (!stand) return null;

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Stand {stand.standNo}</DrawerTitle>
          <DrawerDescription>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${statusConfig[stand.status].className}`}
            >
              {statusConfig[stand.status].label}
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
          <p>
            <strong>Category:</strong> {stand.category}
          </p>
          <p>
            <strong>Price:</strong> ${stand.price.toLocaleString()}
          </p>
          <p>
            <strong>Dimensions:</strong> {stand.width} x {stand.height}
          </p>
          <p>
            <strong>Position:</strong> ({stand.x}, {stand.y})
          </p>
        </div>
        <DrawerFooter>
          {stand.status === "available" && (
            <Button className="w-full">Reserve now (10 min lock)</Button>
          )}
          {stand.status === "reserved" && (
            <Button variant="outline" disabled>
              Reserved by someone else
            </Button>
          )}
          {stand.status === "booked" && (
            <Button variant="outline" disabled>
              Already booked
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
