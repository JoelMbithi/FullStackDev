import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import { Navbar } from "./_components/Navbar";

const DashboardLayout = ({
    children
}: {
    children: ReactNode
}) => {
    return ( 
        <div className="h-full">
          {/**Add Navbar here */}
          <div className="h-[80px] md:pl-56 fixed insert-y-0 w-full z-50">
            <Navbar />

          </div>
           {/**Add Sidebar here */}
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
             <Sidebar />
            </div>
            <main className="md:pl-56 pt-[80px] h-full relative z-20">

            {children}
            </main>
            
        </div>
     );
}
 
export default DashboardLayout;