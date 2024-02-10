import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { expid: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !params.expid) {
      return new NextResponse("unauthorized");
    }

    const exp = await db.experince.delete({
      where: { id: params.expid, userId: currentUser.id },
    });

    return NextResponse.json(exp);
  } catch (Err: any) {
    return new NextResponse(Err.message);
  }
}
