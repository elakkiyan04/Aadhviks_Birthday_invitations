import { BirthdayInvitationConfig } from "@/types/birthday";

export const BIRTHDAY_CLIENTS: Record<string, BirthdayInvitationConfig> = {
  aadhvik: {
    id: "bday-aadhvik-001",
    slug: "aadhvik",
    babyName: {
      en: "Aadhvik",
      ta: "ஆத்விக்",
    },
    celebrationTitle: {
      en: "Aadhvik's First Birthday Celebration",
      ta: "ஆத்விக்கின் முதலாவது பிறந்தநாள் விழா",
    },
    heroTagline: {
      en: "Turns ONE with Baby Krishna's Divine Grace",
      ta: "கண்ணனின் அருளோடு முதலாவது அகவையில் தளிர் நடை",
    },
    dateOfBirth: "2026-03-15",
    celebrationDate: "2027-03-15",
    celebrationTime: "5:00 PM",
    timezone: "Asia/Colombo",
    fatherName: {
      en: "Arun",
      ta: "அருண்",
    },
    motherName: {
      en: "Priya",
      ta: "பிரியா",
    },
    invitationWelcome: {
      en: "With Little Footsteps and Big Blessings",
      ta: "சின்னஞ்சிறு காலடிகளுடன் பேரானந்தம்",
    },
    blessingTitle: {
      en: "Divine Blessings of Lord Krishna",
      ta: "ஸ்ரீ கிருஷ்ணரின் திவ்ய ஆசிகள்",
    },
    blessingMessage: {
      en: "May the innocent smile of little Krishna always illuminate Aadhvik's life with joy, good health, wisdom, and boundless happiness. We invite you to join us in showering your heartfelt blessings upon our little darling.",
      ta: "பால கண்ணனின் அருள்மழையில் தவழும் எங்கள் செல்வக்குழந்தை ஆத்விக்கிற்கு நல்வாழ்வும், நீண்ட ஆயுளும், நிறைந்த செல்வமும் கிட்ட எல்லாம் வல்ல இறைவனை பிரார்த்தித்து, உங்களின் அன்பான நல்வாழ்த்துக்களையும் ஆசிகளையும் வழங்கிட அன்புடன் அழைக்கின்றோம்.",
    },
    parentsMessage: {
      en: "One year ago, our little prince entered our world and filled every moment with laughter and wonder. Arun & Priya cordially invite our beloved family and friends to celebrate Aadhvik's magical 1st birthday milestone.",
      ta: "எங்கள் இல்லத்தில் மகிழ்ச்சி ஒளி வீசி, எங்கள் உலகை பேரானந்தத்தால் நிரப்பிய எங்களின் கண்மணி ஆத்விக்கின் முதலாம் ஆண்டு பிறந்தநாள் நன்நாளை குடும்பத்தோடும் உற்றார் உறவினர்களோடும் கொண்டாட அன்போடு அழைக்கிறோம்.",
    },
    thankYouMessage: {
      en: "Your presence and blessings mean the world to our family. Thank you for being a cherished part of Aadhvik's first year celebration!",
      ta: "உங்களின் வரவும், மேலான ஆசிகளும் எங்கள் இதயத்தை நெகிழச் செய்கின்றன. ஆத்விக்கின் முதலாம் ஆண்டு பிறந்தநாளில் பங்கு கொண்டு சிறப்பித்த அனைவருக்கும் எங்களின் நெஞ்சார்ந்த நன்றிகள்!",
    },
    venueName: {
      en: "Birthday Celebration Hall (Demo)",
      ta: "பிறந்தநாள் கொண்டாட்ட மண்டபம் (டெமோ)",
    },
    address: {
      en: "Jaffna Town, Sri Lanka",
      ta: "யாழ்ப்பாண நகரம், இலங்கை",
    },
    googleMapsUrl: "https://maps.google.com/?q=Jaffna+Town,+Sri+Lanka",
    babyProfilePhoto: "/images/krishna/krishna-hero.png",
    openingPhoto: "/images/first page.jpeg",
    peekPhoto: "/images/krishna/krishna-peek.png",
    babyGallery: [
      {
        id: "g1",
        url: "/images/first page.jpeg",
        monthTag: "1st Month",
        title: { en: "Divine Beginning", ta: "திவ்ய ஆரம்பம்" },
        caption: { en: "First heavenly smile that melted our hearts", ta: "எங்கள் மனதை கவர்ந்த முதல் புன்னகை" },
      },
      {
        id: "g2",
        url: "/images/krishna/krishna-portrait.jpg",
        monthTag: "3rd Month",
        title: { en: "Sweet Flute Melody", ta: "இன்னிசை பாலகன்" },
        caption: { en: "Dressed with sweet pearls and morning sunshine", ta: "முத்துக்களும் பனித்துளியும் இணைந்த அழகு" },
      },
      {
        id: "g3",
        url: "/images/krishna/krishna-peek.png",
        monthTag: "6th Month",
        title: { en: "Little Mischief", ta: "மழலைக் குறும்பு" },
        caption: { en: "Peeking with joy and filling our home with giggles", ta: "சிரிப்பொலியால் வீட்டை நிரப்பும் கள்ளமில்லா அழகு" },
      },
      {
        id: "g4",
        url: "/images/krishna/krishna-lotus.png",
        monthTag: "9th Month",
        title: { en: "Golden Lotuses", ta: "பொன் மலர்கள்" },
        caption: { en: "Holding prayers and blessings in little hands", ta: "கைகளில் தவழும் தாமரை மலர்கள்" },
      },
      {
        id: "g5",
        url: "/images/krishna/krishna-hero.png",
        monthTag: "12th Month",
        title: { en: "Turns ONE Today!", ta: "முதலாவது அகவையில்" },
        caption: { en: "Our little prince ready for his grand milestone", ta: "முதல் பிறந்தநாள் கொண்டாட்டம்" },
      },
    ],
    backgroundMusic: {
      url: "/music/krishna-bgm.m4a",
      title: "Divine Krishna Flute Melody",
      artist: "Elora Moments",
    },
    rsvp: {
      enabled: true,
      deadline: "2027-03-10",
      maxGuestsPerParty: 8,
    },
    wishes: {
      enabled: true,
    },
    publishingStatus: "published",
    clientAccessCode: "aadhvik2027",
  },

  niya: {
    id: "bday-niya-002",
    slug: "niya",
    babyName: {
      en: "Niya",
      ta: "நியா",
    },
    celebrationTitle: {
      en: "Niya's First Birthday Celebration",
      ta: "நியாவின் முதலாவது பிறந்தநாள் விழா",
    },
    heroTagline: {
      en: "Little Princess Turns ONE",
      ta: "எங்கள் செல்ல இளவரசி முதலாவது அகவையில்",
    },
    dateOfBirth: "2026-04-20",
    celebrationDate: "2027-04-20",
    celebrationTime: "6:00 PM",
    timezone: "Asia/Colombo",
    fatherName: {
      en: "Vimal",
      ta: "விமல்",
    },
    motherName: {
      en: "Kavitha",
      ta: "கவிதா",
    },
    invitationWelcome: {
      en: "A Year of Boundless Love & Sunshine",
      ta: "ஆண்டொன்று இனிதே கனிந்தது",
    },
    blessingTitle: {
      en: "Showered with Love and Blessings",
      ta: "அன்பும் ஆசிகளும் நிறைந்த நன்னாளில்",
    },
    blessingMessage: {
      en: "May Lord Krishna bless our precious Niya with a life full of sweetness, melody, and radiant joy.",
      ta: "கண்ணனின் இன்னிசையோடு மலரும் எங்கள் அன்பு மகள் நியாவிற்கு ஆசிகளையும் நல்வாழ்த்துகளையும் நல்க அன்புடன் அழைக்கிறோம்.",
    },
    parentsMessage: {
      en: "Vimal & Kavitha warmly welcome you to join in the joyful first birthday celebration of our darling angel.",
      ta: "விமல் மற்றும் கவிதா தங்களின் செல்ல மகளின் முதலாம் ஆண்டு பிறந்தநாள் விழாவிற்கு தங்களை அன்போடு வரவேற்கிறோம்.",
    },
    thankYouMessage: {
      en: "Thank you for gracing our celebration with your warm presence and blessings!",
      ta: "எங்கள் இல்ல விழாவில் கலந்து கொண்டு ஆசீர்வதித்த உங்கள் அனைவருக்கும் நெஞ்சார்ந்த நன்றிகள்!",
    },
    venueName: {
      en: "Royal Palace Banquet (Demo)",
      ta: "ராயல் பேலஸ் அரங்கம்",
    },
    address: {
      en: "Colombo 03, Sri Lanka",
      ta: "கொழும்பு 03, இலங்கை",
    },
    googleMapsUrl: "https://maps.google.com/?q=Colombo+03,+Sri+Lanka",
    babyProfilePhoto: "/images/krishna/krishna-lotus.png",
    openingPhoto: "/images/krishna/krishna-opening.jpg",
    babyGallery: [
      {
        id: "ng1",
        url: "/images/krishna/krishna-lotus.png",
        monthTag: "6th Month",
        title: { en: "Sunshine Smile", ta: "புன்னகை பூக்கள்" },
        caption: { en: "Giggles that brighten our lives", ta: "எங்கள் வாழ்வின் வெளிச்சம்" },
      },
      {
        id: "ng2",
        url: "/images/krishna/krishna-peek.png",
        monthTag: "12th Month",
        title: { en: "Little Princess", ta: "செல்ல இளவரசி" },
        caption: { en: "Turns ONE year old with love", ta: "முதலாவது அகவை கொண்டாட்டம்" },
      },
    ],
    backgroundMusic: {
      url: "/music/krishna-bgm.m4a",
      title: "Divine Flute Melody",
    },
    rsvp: {
      enabled: true,
      deadline: "2027-04-15",
      maxGuestsPerParty: 6,
    },
    wishes: {
      enabled: true,
    },
    publishingStatus: "published",
    clientAccessCode: "niya2027",
  },

  aaron: {
    id: "bday-aaron-003",
    slug: "aaron",
    babyName: {
      en: "Aaron",
      ta: "ஆரோன்",
    },
    celebrationTitle: {
      en: "Aaron's First Birthday Celebration",
      ta: "ஆரோனின் முதலாவது பிறந்தநாள் விழா",
    },
    heroTagline: {
      en: "Little Miracle Turns ONE",
      ta: "எங்கள் செல்ல செல்வன் முதலாவது அகவையில்",
    },
    dateOfBirth: "2026-05-18",
    celebrationDate: "2027-05-18",
    celebrationTime: "5:30 PM",
    timezone: "Asia/Colombo",
    fatherName: {
      en: "Dinesh",
      ta: "தினேஷ்",
    },
    motherName: {
      en: "Shalini",
      ta: "ஷாலினி",
    },
    invitationWelcome: {
      en: "With Little Footsteps and Big Blessings",
      ta: "சின்னஞ்சிறு காலடிகளுடன் பேரானந்தம்",
    },
    blessingTitle: {
      en: "Divine Grace & Joy",
      ta: "இறைவனின் ஆசிகளோடு",
    },
    blessingMessage: {
      en: "May divine blessings always surround Aaron with peace, laughter, and wisdom.",
      ta: "எங்கள் செல்வக்குழந்தை ஆரோனுக்கு இறைவனின் அருளும் அன்பும் என்றும் துணைநிற்க உளமார பிரார்த்திக்கிறோம்.",
    },
    parentsMessage: {
      en: "Dinesh & Shalini invite you with immense happiness to celebrate our little darling's 1st milestone.",
      ta: "தினேஷ் & ஷாலினி எங்கள் கண்மணி ஆரோனின் முதலாம் ஆண்டு பிறந்தநாளில் பங்கு கொண்டு சிறப்பிக்க அன்போடு அழைக்கிறோம்.",
    },
    thankYouMessage: {
      en: "Thank you for your blessings and warm love for our family!",
      ta: "ஆரோனை ஆசீர்வதித்த உங்கள் அனைவருக்கும் நெஞ்சார்ந்த நன்றிகள்!",
    },
    venueName: {
      en: "Lotus Blossom Pavilion (Demo)",
      ta: "தாமரை மலர் அரங்கம்",
    },
    address: {
      en: "Kandy, Sri Lanka",
      ta: "கண்டி, இலங்கை",
    },
    googleMapsUrl: "https://maps.google.com/?q=Kandy,+Sri+Lanka",
    babyProfilePhoto: "/images/krishna/krishna-portrait.jpg",
    openingPhoto: "/images/krishna/krishna-opening.jpg",
    babyGallery: [
      {
        id: "ag1",
        url: "/images/krishna/krishna-portrait.jpg",
        monthTag: "6th Month",
        title: { en: "Bright Eyes", ta: "கண்களில் ஒளி" },
        caption: { en: "A heart full of wonder", ta: "மழலை அன்பு" },
      },
      {
        id: "ag2",
        url: "/images/krishna/krishna-hero.png",
        monthTag: "12th Month",
        title: { en: "Milestone Joy", ta: "வெற்றி நடை" },
        caption: { en: "Turns ONE with divine blessings", ta: "முதலாவது பிறந்தநாள்" },
      },
    ],
    backgroundMusic: {
      url: "/music/krishna-bgm.m4a",
      title: "Peaceful Flute Melody",
    },
    rsvp: {
      enabled: true,
      deadline: "2027-05-10",
      maxGuestsPerParty: 6,
    },
    wishes: {
      enabled: true,
    },
    publishingStatus: "published",
    clientAccessCode: "aaron2027",
  },
};

export function getBirthdayBySlug(slug: string): BirthdayInvitationConfig | null {
  const normalized = slug.trim().toLowerCase();
  return BIRTHDAY_CLIENTS[normalized] || null;
}

export function getAllBirthdaySlugs(): string[] {
  return Object.keys(BIRTHDAY_CLIENTS);
}
