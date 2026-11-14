-- =========================================================================
-- ELORA MOMENTS: FIRST BIRTHDAY DIGITAL E-INVITATION DATABASE SCHEMA
-- Compatible with Supabase PostgreSQL (Free Tier & Production)
-- =========================================================================

-- Enable uuid generation if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: birthdays
CREATE TABLE IF NOT EXISTS public.birthdays (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  slug TEXT UNIQUE NOT NULL,
  baby_name_en TEXT NOT NULL,
  baby_name_ta TEXT NOT NULL,
  celebration_date DATE NOT NULL,
  celebration_time TEXT NOT NULL,
  venue_name_en TEXT NOT NULL,
  venue_name_ta TEXT NOT NULL,
  address_en TEXT NOT NULL,
  address_ta TEXT NOT NULL,
  google_maps_url TEXT,
  configuration JSONB DEFAULT '{}'::jsonb,
  client_access_pin TEXT NOT NULL DEFAULT '123456',
  published BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by slug
CREATE INDEX IF NOT EXISTS idx_birthdays_slug ON public.birthdays(slug);

-- 2. Table: birthday_rsvps
CREATE TABLE IF NOT EXISTS public.birthday_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  birthday_id TEXT NOT NULL REFERENCES public.birthdays(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT true,
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 0 AND guest_count <= 20),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for birthday_rsvps
CREATE INDEX IF NOT EXISTS idx_birthday_rsvps_bday ON public.birthday_rsvps(birthday_id);
CREATE INDEX IF NOT EXISTS idx_birthday_rsvps_created ON public.birthday_rsvps(created_at DESC);

-- 3. Table: birthday_wishes
CREATE TABLE IF NOT EXISTS public.birthday_wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  birthday_id TEXT NOT NULL REFERENCES public.birthdays(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for wishes
CREATE INDEX IF NOT EXISTS idx_birthday_wishes_bday ON public.birthday_wishes(birthday_id);

-- 4. Row Level Security (RLS) Setup
ALTER TABLE public.birthdays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birthday_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birthday_wishes ENABLE ROW LEVEL SECURITY;

-- Public can view published birthdays
CREATE POLICY "Public can view published birthdays"
  ON public.birthdays FOR SELECT
  USING (published = true);

-- Public can submit an RSVP
CREATE POLICY "Guests can submit RSVPs"
  ON public.birthday_rsvps FOR INSERT
  WITH CHECK (true);

-- Public can submit birthday wishes
CREATE POLICY "Guests can submit wishes"
  ON public.birthday_wishes FOR INSERT
  WITH CHECK (true);

-- Public can view approved wishes
CREATE POLICY "Guests can view approved wishes"
  ON public.birthday_wishes FOR SELECT
  USING (approved = true);

-- RSVPs cannot be read by public (only via Service Role in Server Actions or authenticated client page)
CREATE POLICY "Service role manages RSVPs"
  ON public.birthday_rsvps FOR SELECT
  USING (auth.role() = 'service_role');

-- Seed initial demo birthday data
INSERT INTO public.birthdays (
  id,
  slug,
  baby_name_en,
  baby_name_ta,
  celebration_date,
  celebration_time,
  venue_name_en,
  venue_name_ta,
  address_en,
  address_ta,
  google_maps_url,
  client_access_pin,
  published
) VALUES (
  'bday-aadhvik-001',
  'aadhvik',
  'Aadhvik',
  'ஆத்விக்',
  '2027-03-15',
  '5:00 PM',
  'Birthday Celebration Hall (Demo)',
  'பிறந்தநாள் கொண்டாட்ட மண்டபம் (டெமோ)',
  'Jaffna Town, Sri Lanka',
  'யாழ்ப்பாண நகரம், இலங்கை',
  'https://maps.google.com/?q=Jaffna+Town,+Sri+Lanka',
  'aadhvik2027',
  true
) ON CONFLICT (slug) DO NOTHING;

