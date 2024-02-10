import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { expId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !params.expId) {
      return new NextResponse("unauthorized");
    }

    const exp = await db.experince.delete({
      where: { id: params.expId },
    });

    return NextResponse.json(exp);
  } catch (Err: any) {
    return new NextResponse(Err.message);
  }
}
