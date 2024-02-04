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

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    const currentUser = await getCurrentUser();

    if (!projectId) {
      return new NextResponse("invalid id", { status: 404 });
    }

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const project = await db.projects.delete({
      where: {
        id: projectId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(project);
  } catch (Err: any) {
    return new NextResponse(Err.message, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unaythorized", { status: 401 });
    }

    const { name, desc, more, images } = await req.json();

    if (!name || !desc || !more || images.length <= 0 || !params.projectId) {
      return new NextResponse("empty values", { status: 404 });
    }

    const project = await db.projects.update({
      where: {
        id: params.projectId,
        userId: currentUser.id,
      },
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
