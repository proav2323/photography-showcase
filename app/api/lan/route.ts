import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthrozed", { status: 401 });
    }

    const { name, level } = await req.json();

    if (!name || !level) {
      return new NextResponse("invalid data", { status: 404 });
    }

    const exp = await db.language.create({
      data: {
        name: name,
        level: level,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(exp);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 501 });
  }
}
