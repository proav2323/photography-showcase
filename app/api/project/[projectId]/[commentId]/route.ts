import { projects } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/libs/sb";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { projectId?: string; commentId?: string };
  }
) {
  try {
    const { projectId, commentId } = params;
    const currentUser = await getCurrentUser();

    if (!projectId || !commentId) {
      return new NextResponse("invalied", { status: 401 });
    }

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 402 });
    }

    const project = await db.projects.update({
      where: {
        id: projectId,
      },
      data: {
        comments: {
          delete: {
            id: commentId,
            createdById: currentUser.id,
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
  } catch (err: any) {
    return new NextResponse(err.message, { status: 501 });
  }
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { projectId?: string; commentId?: string };
  }
) {
  try {
    const { projectId, commentId } = params;
    const currentUser = await getCurrentUser();
    const { message } = await req.json();

    if (!projectId || !commentId || !message || message === "") {
      return new NextResponse("invalied", { status: 401 });
    }

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 402 });
    }

    const project = await db.projects.update({
      where: {
        id: projectId,
      },
      data: {
        comments: {
          update: {
            where: {
              id: commentId,
              createdById: currentUser.id,
            },
            data: {
              message: message,
            },
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
  } catch (Err: any) {
    console.log(Err);
    return new NextResponse(Err.message, { status: 500 });
  }
}
