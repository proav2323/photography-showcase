import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthrozed", { status: 401 });
    }

    const { company, position, location, startDate, endDate } =
      await req.json();

    if (!company || !position || !location || !startDate) {
      return new NextResponse("invalid data", { status: 404 });
    }

    const exp = await db.experince.create({
      data: {
        company: company,
        posotion: position,
        location: location,
        startingDate: startDate,
        endingDate: endDate ? endDate : undefined,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(exp);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 501 });
  }
}
