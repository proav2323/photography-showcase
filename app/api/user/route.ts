import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/libs/sb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 500 });
    }

    const {
      firstName,
      lastName,
      bio,
      occupation,
      location,
      profileImg,
      bannerImg,
      websiteUrl,
    } = await req.json();

    if (!firstName || !lastName) {
      return new NextResponse("invalid data");
    }

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        bio: bio ? bio : undefined,
        occupation: occupation ? occupation : undefined,
        location: location ? location : undefined,
        profileImg: profileImg ? profileImg : undefined,
        bannerImg: bannerImg ? bannerImg : undefined,
        websiteUrl: websiteUrl ? websiteUrl : undefined,
      },
    });

    return NextResponse.json(user);
  } catch (Err: any) {
    return new Response(Err.message);
  }
}
