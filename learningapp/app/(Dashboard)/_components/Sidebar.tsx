import { Logo } from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
const Sidebar = () => {
    return ( 
      <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm z-10">

          <div className="p-6 flex ">
            <Logo /> 
            <h1 className="p-2 mt-2 text-bold text-">Learning App</h1>
          </div>
          <div className=" flex flex-col w-full">
             <SidebarRoutes />
          </div>
        </div>
     );
}
 
export default Sidebar;