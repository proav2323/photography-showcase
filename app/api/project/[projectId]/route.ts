import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    const currentUser = await getCurrentUser();
    const { message } = await req.json();

    if (!projectId || !message) {
      return new NextResponse("invalid", { status: 401 });
    }

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 402 });
    }

    const comment = await db.comments.create({
      data: {
        createdById: currentUser.id,
        message: message,
        projectId: projectId,
      },
    });

    const project = await db.projects.update({
      where: {
        id: projectId,
      },
      data: {
        comments: {
          connect: {
            id: comment.id,
          },
        },
      },
      include: {
        comments: {
          include: {
            createdBy: true,
          },
        },
        user: true,
      },
    });

    return NextResponse.json(project);
  } catch (Err) {
    return new NextResponse("something went wrong", { status: 500 });
  }
}
