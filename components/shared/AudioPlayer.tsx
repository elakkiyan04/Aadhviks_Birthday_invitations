"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  musicUrl?: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  musicUrl = "/music/krishna-bgm.m4a",
  title = "Divine Krishna Flute",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [usingSynth, setUsingSynth] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesize peaceful flute notes via Web Audio API when MP3 is missing
  const playFluteSynthNote = (freq: number, duration = 1.2) => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Flute harmonic timbre: sine with soft lowpass
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5; // 5.5Hz vibrato
      vibratoGain.gain.value = 2.5; // slight pitch modulation
      vibrato.connect(osc.frequency);
      vibrato.start();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      // Breath envelope
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.08, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
      vibrato.stop(now + duration);
    } catch (e) {
      console.warn("Audio synthesis note error:", e);
    }
  };

  // Krishna Raag Bhupali / Mohanam flute notes (E4, G4, A4, B4, D5, E5)
  const melodyNotes = [329.63, 392.0, 440.0, 493.88, 587.33, 659.25, 587.33, 493.88, 440.0, 392.0];

  const startSynthMelody = () => {
    let noteIdx = 0;
    setUsingSynth(true);
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

    // Initial note
    playFluteSynthNote(melodyNotes[0], 1.4);

    synthIntervalRef.current = setInterval(() => {
      noteIdx = (noteIdx + 1) % melodyNotes.length;
      playFluteSynthNote(melodyNotes[noteIdx], 1.4);
    }, 1100);
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.src = musicUrl;
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const handleCanPlay = () => setAudioLoaded(true);
    const handleError = () => {
      // Graceful fallback to Web Audio flute synthesizer
      setAudioLoaded(false);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      stopSynthMelody();
    };
  }, [musicUrl]);

  const togglePlay = async () => {
    setHasInteracted(true);
    if (isPlaying) {
      if (audioRef.current && audioLoaded) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioLoaded) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // If browser restricts, start synth flute
          startSynthMelody();
          setIsPlaying(true);
        }
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Floating Ambient Music Controller */}
      <div className="fixed bottom-5 right-4 z-40 flex items-center space-x-2">
        {!hasInteracted && !isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-deep-night/90 border border-antique-gold/50 shadow-gold-glow text-xs text-ivory-cream animate-bounce"
          >
            <Music className="w-3.5 h-3.5 text-antique-gold animate-spin-slow" />
            <span>Play Krishna Flute</span>
          </button>
        )}

        <div className="flex items-center bg-deep-night/85 backdrop-blur-md border border-antique-gold/45 rounded-full p-1.5 shadow-gold-glow">
          <button
            type="button"
            onClick={togglePlay}
            title={isPlaying ? "Pause Flute Music" : "Play Krishna Flute Music"}
            aria-label={isPlaying ? "Pause Flute Music" : "Play Krishna Flute Music"}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-deep-night" />
            ) : (
              <Play className="w-4 h-4 fill-deep-night translate-x-0.5" />
            )}
          </button>

          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-antique-gold hover:text-ivory-cream transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {isPlaying && (
            <div className="flex items-center space-x-0.5 px-2">
              <span className="w-1 h-3 bg-antique-gold rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-gold-light rounded-full animate-pulse [animation-delay:200ms]" />
              <span className="w-1 h-2 bg-antique-gold rounded-full animate-pulse [animation-delay:400ms]" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

