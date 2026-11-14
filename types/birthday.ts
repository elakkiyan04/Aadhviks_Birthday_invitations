export type Language = 'en' | 'ta';

export interface LocalizedString {
  en: string;
  ta: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: LocalizedString;
  monthTag?: string;
  title?: LocalizedString;
}

export interface BirthdayInvitationConfig {
  id: string;
  slug: string;
  babyName: LocalizedString;
  celebrationTitle: LocalizedString;
  heroTagline: LocalizedString;
  dateOfBirth: string; // YYYY-MM-DD
  celebrationDate: string; // YYYY-MM-DD
  celebrationTime: string; // e.g. "5:00 PM"
  timezone: string; // "Asia/Colombo"
  fatherName: LocalizedString;
  motherName: LocalizedString;
  invitationWelcome: LocalizedString;
  blessingTitle: LocalizedString;
  blessingMessage: LocalizedString;
  parentsMessage: LocalizedString;
  thankYouMessage: LocalizedString;
  venueName: LocalizedString;
  address: LocalizedString;
  googleMapsUrl?: string; // Configurable URL supplied by client, no coordinates
  babyProfilePhoto: string;
  openingPhoto?: string;
  peekPhoto?: string;
  babyGallery: GalleryPhoto[];
  backgroundMusic: {
    url: string;
    title: string;
    artist?: string;
  };
  themeColors?: {
    peacockBlue: string;
    krishnaBlue: string;
    antiqueGold: string;
    ivoryCream: string;
    skyBlue: string;
    peacockGreen: string;
  };
  rsvp: {
    enabled: boolean;
    deadline?: string;
    maxGuestsPerParty?: number;
  };
  wishes: {
    enabled: boolean;
  };
  publishingStatus: 'published' | 'draft' | 'archived';
  expiresAt?: string;
  clientAccessCode: string; // Used for client's private RSVP page authentication
}

export interface RSVPRecord {
  id: string;
  birthday_id: string;
  guest_name: string;
  attending: boolean;
  guest_count: number;
  message?: string;
  created_at: string;
  updated_at?: string;
}

export interface BirthdayWishRecord {
  id: string;
  birthday_id: string;
  sender_name: string;
  message: string;
  blessing_type?: string;
  created_at: string;
  approved?: boolean;
}

