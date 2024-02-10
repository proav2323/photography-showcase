import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !params.linkId) {
      return new NextResponse("unauthorized");
    }

    const exp = await db.links.delete({
      where: { id: params.linkId, userId: currentUser.id },
    });

    return NextResponse.json(exp);
  } catch (Err: any) {
    return new NextResponse(Err.message);
  }
}
