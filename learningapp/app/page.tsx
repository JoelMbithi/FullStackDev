"use client";  

import { UserButton, useUser } from "@clerk/nextjs";
import DashboardLayout from "./(Dashboard)/layout";

export default function Home() {
  const { user } = useUser(); 

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 p-6">
        {/* UserButton will handle profile image & logout */}
        {user && <UserButton afterSignOutUrl="/" />}
        
        <h1 className="text-xl font-bold">Welcome, {user?.firstName}!</h1>
      </div>
    </DashboardLayout>
  );
}
