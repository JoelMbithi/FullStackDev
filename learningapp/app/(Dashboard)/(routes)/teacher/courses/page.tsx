import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursePage = () => {
    return ( 
        <div className="p-2">
            <Link href="/teacher/create" passHref>
                <Button asChild>
                    <span>New Course</span>
                </Button>
            </Link>
        </div>
    );
}

export default CoursePage;
