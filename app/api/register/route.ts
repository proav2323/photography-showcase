import bcrypt from "bcrypt";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return new NextResponse("invalid credentials", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
    });

    return NextResponse.json(user);
  } catch (Er: any) {
    return new NextResponse(Er.message);
  }
}
