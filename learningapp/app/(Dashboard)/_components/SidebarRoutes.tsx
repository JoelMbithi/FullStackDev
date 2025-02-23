"use client"
import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./SidebarItem";




const guestRoutes = [
{
    icon: Layout,
    label: "Dashboard",
    href:"/"
},
{
    icon: Compass,
    label: "Browser",
    href:"/search"
}
]

const SidebarRoutes = () => {
    const routes = guestRoutes;
    return ( 
        <div  className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                 key={route.href}
                label={route.label}
                icon={route.icon}
                 href={route.href}
                 />
            ))}
        </div>
     );
}
 
export default SidebarRoutes;