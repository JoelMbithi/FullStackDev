import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId?: string } } // Directly destructure params
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params?.courseId) {
            return new NextResponse("Bad Request: Missing Course ID", { status: 400 });
        }

        const { courseId } = params; // Now params is available properly
        const values = await req.json();

        const course = await db.course.update({
            where: {
                id: courseId,
                userId: userId as string,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
