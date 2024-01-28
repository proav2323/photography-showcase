import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unaythorized", { status: 401 });
    }

    const { name, desc, more, images } = await req.json();

    if (!name || !desc || !more || images.length <= 0) {
      return new NextResponse("empty values", { status: 404 });
    }

    const project = await db.projects.create({
      data: {
        userId: currentUser.id,
        name: name,
        description: desc,
        moreToKnow: more,
        images: images,
      },
    });

    return NextResponse.json(project);
  } catch (Err: any) {
    return new NextResponse(Err.message, { status: 500 });
  }
}
