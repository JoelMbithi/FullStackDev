import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarRoutes from "./SidebarRoutes"; // Import full sidebar routes

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white w-64" side="left">
        <div className="p-6">
          <SidebarRoutes /> {/* Display full sidebar menu */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
