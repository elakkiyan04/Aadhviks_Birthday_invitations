import { RSVPRecord, BirthdayWishRecord } from "@/types/birthday";
import { getServerSupabase, isServerSupabaseConfigured } from "./server";
import { getBirthdayBySlug } from "../birthdays/config";

// In-memory demo fallback storage when Supabase is not configured
interface MockStore {
  rsvps: RSVPRecord[];
  wishes: BirthdayWishRecord[];
}

const globalMockStore: MockStore = {
  rsvps: [
    {
      id: "demo-rsvp-1",
      birthday_id: "bday-aadhvik-001",
      guest_name: "Senthilkumar & Family",
      attending: true,
      guest_count: 4,
      message: "Looking forward to blessing little Aadhvik on his special day! Congratulations Arun & Priya!",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-rsvp-2",
      birthday_id: "bday-aadhvik-001",
      guest_name: "Thivya & Rajesh",
      attending: true,
      guest_count: 2,
      message: "So thrilled to join the celebration! All our love to little baby Krishna.",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-rsvp-3",
      birthday_id: "bday-aadhvik-001",
      guest_name: "Vaitheki Mohan",
      attending: false,
      guest_count: 0,
      message: "Sending prayers from London. Will deeply miss being there in person. God bless dear Aadhvik!",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-rsvp-4",
      birthday_id: "bday-aadhvik-001",
      guest_name: "Kandeepan & Gayathri",
      attending: true,
      guest_count: 3,
      message: "Can't wait to see the little prince turn one!",
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ],
  wishes: [
    {
      id: "demo-wish-1",
      birthday_id: "bday-aadhvik-001",
      sender_name: "Grandpa Ramanathan",
      message: "May Lord Krishna always guide and protect our little grandchild Aadhvik with wisdom, long life, and endless joy.",
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      approved: true,
    },
    {
      id: "demo-wish-2",
      birthday_id: "bday-aadhvik-001",
      sender_name: "Ananya Auntie",
      message: "Happy 1st Birthday darling Aadhvik! May your days be filled with as much happiness as your smile brings to everyone.",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      approved: true,
    },
  ],
};

export async function submitRsvp(payload: {
  birthdayId: string;
  guestName: string;
  attending: boolean;
  guestCount: number;
  message?: string;
}): Promise<{ success: boolean; error?: string; isDemoMode: boolean }> {
  // Input validation
  const cleanName = payload.guestName?.trim();
  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: "Please enter your name (minimum 2 characters).", isDemoMode: !isServerSupabaseConfigured };
  }

  const guestCount = payload.attending ? Math.max(1, Math.min(20, Number(payload.guestCount) || 1)) : 0;

  if (isServerSupabaseConfigured) {
    const supabase = getServerSupabase();
    if (supabase) {
      const { error } = await supabase.from("birthday_rsvps").insert({
        birthday_id: payload.birthdayId,
        guest_name: cleanName,
        attending: payload.attending,
        guest_count: guestCount,
        message: payload.message?.trim() || null,
      });

      if (error) {
        console.error("Supabase RSVP Insert Error:", error);
        return { success: false, error: error.message, isDemoMode: false };
      }
      return { success: true, isDemoMode: false };
    }
  }

  // Demo fallback
  const newRecord: RSVPRecord = {
    id: `demo-rsvp-${Date.now()}`,
    birthday_id: payload.birthdayId,
    guest_name: cleanName,
    attending: payload.attending,
    guest_count: guestCount,
    message: payload.message?.trim(),
    created_at: new Date().toISOString(),
  };

  globalMockStore.rsvps.unshift(newRecord);
  return { success: true, isDemoMode: true };
}

export async function submitWish(payload: {
  birthdayId: string;
  senderName: string;
  message: string;
}): Promise<{ success: boolean; error?: string; isDemoMode: boolean }> {
  const cleanName = payload.senderName?.trim();
  const cleanMsg = payload.message?.trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: "Please provide your name.", isDemoMode: !isServerSupabaseConfigured };
  }
  if (!cleanMsg || cleanMsg.length < 3) {
    return { success: false, error: "Please write a heartfelt wish or blessing.", isDemoMode: !isServerSupabaseConfigured };
  }

  if (isServerSupabaseConfigured) {
    const supabase = getServerSupabase();
    if (supabase) {
      const { error } = await supabase.from("birthday_wishes").insert({
        birthday_id: payload.birthdayId,
        sender_name: cleanName,
        message: cleanMsg,
        approved: true,
      });
      if (error) {
        return { success: false, error: error.message, isDemoMode: false };
      }
      return { success: true, isDemoMode: false };
    }
  }

  // Demo fallback
  const newWish: BirthdayWishRecord = {
    id: `demo-wish-${Date.now()}`,
    birthday_id: payload.birthdayId,
    sender_name: cleanName,
    message: cleanMsg,
    approved: true,
    created_at: new Date().toISOString(),
  };

  globalMockStore.wishes.unshift(newWish);
  return { success: true, isDemoMode: true };
}

export async function fetchRsvpsForClient(
  slug: string,
  accessCode: string
): Promise<{
  success: boolean;
  data?: RSVPRecord[];
  error?: string;
  isDemoMode: boolean;
}> {
  const birthday = getBirthdayBySlug(slug);
  if (!birthday) {
    return { success: false, error: "Birthday invitation not found.", isDemoMode: false };
  }

  // Verify access pin / password
  if (accessCode.trim() !== birthday.clientAccessCode) {
    return { success: false, error: "Invalid access code. Please check your invitation credentials.", isDemoMode: !isServerSupabaseConfigured };
  }

  if (isServerSupabaseConfigured) {
    const supabase = getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("birthday_rsvps")
        .select("*")
        .eq("birthday_id", birthday.id)
        .order("created_at", { ascending: false });

      if (error) {
        return { success: false, error: error.message, isDemoMode: false };
      }
      return { success: true, data: data as RSVPRecord[], isDemoMode: false };
    }
  }

  // Demo store
  const filtered = globalMockStore.rsvps.filter((r) => r.birthday_id === birthday.id);
  return { success: true, data: filtered, isDemoMode: true };
}

export async function fetchWishesForBirthday(
  birthdayId: string
): Promise<{ data: BirthdayWishRecord[]; isDemoMode: boolean }> {
  if (isServerSupabaseConfigured) {
    const supabase = getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("birthday_wishes")
        .select("*")
        .eq("birthday_id", birthdayId)
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(20);

      if (data) {
        return { data: data as BirthdayWishRecord[], isDemoMode: false };
      }
    }
  }

  const filtered = globalMockStore.wishes.filter((w) => w.birthday_id === birthdayId);
  return { data: filtered, isDemoMode: true };
}

