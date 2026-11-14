import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBirthdayBySlug, getAllBirthdaySlugs } from "@/lib/birthdays/config";
import { LanguageProvider, LanguageSwitcherPill } from "@/components/shared/LanguageContext";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { FloatingParticles } from "@/components/shared/FloatingParticles";
import { WelcomeOpening } from "@/components/birthday/WelcomeOpening";
import { HeroSection } from "@/components/birthday/HeroSection";
import { BlessingsSection } from "@/components/birthday/BlessingsSection";
import { ParentsSection } from "@/components/birthday/ParentsSection";
import { CountdownSection } from "@/components/birthday/CountdownSection";
import { EventDetailsSection } from "@/components/birthday/EventDetailsSection";
import { PhotoGallerySection } from "@/components/birthday/PhotoGallerySection";
import { RsvpSection } from "@/components/birthday/RsvpSection";
import { WishesSection } from "@/components/birthday/WishesSection";
import { ShareAndCalendarSection } from "@/components/birthday/ShareAndCalendarSection";
import { ThankYouSection } from "@/components/birthday/ThankYouSection";
import { EloraFooter } from "@/components/shared/EloraFooter";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllBirthdaySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const birthday = getBirthdayBySlug(params.slug);
  if (!birthday) {
    return {
      title: "Birthday Invitation | Elora Moments",
    };
  }

  const title = `${birthday.babyName.en}'s First Birthday Celebration | Elora Moments`;
  const description = `With Little Footsteps and Big Blessings – You are cordially invited to celebrate ${birthday.babyName.en}'s 1st Birthday on ${birthday.celebrationDate} at ${birthday.celebrationTime}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: birthday.babyProfilePhoto,
          width: 600,
          height: 700,
          alt: `${birthday.babyName.en}'s First Birthday Celebration`,
        },
      ],
    },
  };
}

export default function BirthdayPage({ params }: PageProps) {
  const config = getBirthdayBySlug(params.slug);

  if (!config) {
    notFound();
  }

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-deep-night text-ivory-cream overflow-x-hidden">
        {/* Ambient Floating Starlight/Dust Particles */}
        <FloatingParticles count={25} />

        {/* Floating Top Language Switcher Bar */}
        <header className="fixed top-4 right-4 z-40">
          <LanguageSwitcherPill />
        </header>

        {/* Floating Ambient Krishna Flute Music Player */}
        <AudioPlayer
          musicUrl={config.backgroundMusic.url}
          title={config.backgroundMusic.title}
        />

        {/* Central Vertical Digital Invitation Presentation Container */}
        <div className="relative z-10 w-full max-w-xl mx-auto shadow-2xl bg-krishna-blue/30 backdrop-blur-[2px] border-x border-antique-gold/15">
          {/* Section A: Fullscreen Opening */}
          <WelcomeOpening config={config} />

          {/* Section B: Hero Milestone */}
          <HeroSection config={config} />

          {/* Section C: Blessings */}
          <BlessingsSection config={config} />

          {/* Section D: Parents' Cordial Invitation */}
          <ParentsSection config={config} />

          {/* Section E: Live Birthday Countdown */}
          <CountdownSection config={config} />

          {/* Section F & G: Event Details & Google Maps */}
          <EventDetailsSection config={config} />

          {/* Section H: Photo Gallery with Lightbox */}
          <PhotoGallerySection config={config} />

          {/* Section I: RSVP Form */}
          <RsvpSection config={config} />

          {/* Section J: Birthday Wishes Wall */}
          <WishesSection config={config} />

          {/* Section K & L: WhatsApp Sharing & Calendar Add */}
          <ShareAndCalendarSection config={config} />

          {/* Section M: Thank You Note */}
          <ThankYouSection config={config} />

          {/* Mandatory Section 11: Elora Moments Footer */}
          <EloraFooter />
        </div>
      </main>
    </LanguageProvider>
  );
}

