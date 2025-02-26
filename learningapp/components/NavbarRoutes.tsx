"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const { user } = useUser();
    const pathname = usePathname();
 
    // Check if user is in a teacher-related or player-related page
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.startsWith("/chapter");

    return (
        <div className="flex gap-x-2 ml-auto">
            {/* Show "Exit" when on /teacher or /chapter pages */}
          
            {isTeacherPage || isPlayerPage ? (
                  <Link href="/">
                <Button 
                    size="sm" 
                    variant="ghost"
                    
                >
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                </Link>
            ) : (
                // Show "Teacher mode" when NOT on teacher/chapter pages
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            )}

            {/* User profile button */}
            <UserButton afterSignOutUrl="/" />
        </div>
    );
}
