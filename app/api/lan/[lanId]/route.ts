import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { lanId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !params.lanId) {
      return new NextResponse("unauthorized");
    }

    const exp = await db.language.delete({
      where: { id: params.lanId },
    });

    return NextResponse.json(exp);
  } catch (Err: any) {
    return new NextResponse(Err.message);
  }
}
