import { NextRequest, NextResponse } from "next/server";
import { submitWish, fetchWishesForBirthday } from "@/lib/supabase/rsvp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthdayId, senderName, message } = body;

    if (!birthdayId || !senderName || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = await submitWish({
      birthdayId,
      senderName,
      message,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Wish Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const birthdayId = searchParams.get("birthdayId");

    if (!birthdayId) {
      return NextResponse.json(
        { success: false, error: "birthdayId is required." },
        { status: 400 }
      );
    }

    const result = await fetchWishesForBirthday(birthdayId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Wish GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

