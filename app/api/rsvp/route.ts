import { NextRequest, NextResponse } from "next/server";
import { submitRsvp, fetchRsvpsForClient } from "@/lib/supabase/rsvp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthdayId, guestName, attending, guestCount, message } = body;

    if (!birthdayId || !guestName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = await submitRsvp({
      birthdayId,
      guestName,
      attending: Boolean(attending),
      guestCount: Number(guestCount) || 1,
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
    console.error("API RSVP Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const code = searchParams.get("code");

    if (!slug || !code) {
      return NextResponse.json(
        { success: false, error: "Slug and access code are required." },
        { status: 401 }
      );
    }

    const result = await fetchRsvpsForClient(slug, code);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 403 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API RSVP GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

