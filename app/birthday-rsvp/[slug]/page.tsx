"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RSVPRecord } from "@/types/birthday";
import {
  Lock,
  Download,
  Users,
  CheckCircle,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function ClientRsvpResultsPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "aadhvik";

  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "attending" | "declined">("all");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/rsvp?slug=${encodeURIComponent(slug)}&code=${encodeURIComponent(accessCode.trim())}`
      );
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Access denied. Invalid client code.");
        setLoading(false);
        return;
      }

      setRsvps(json.data || []);
      setIsDemoMode(Boolean(json.isDemoMode));
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err: any) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // Metrics
  const totalResponses = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.attending).length;
  const declinedCount = rsvps.filter((r) => !r.attending).length;
  const totalHeadcount = rsvps
    .filter((r) => r.attending)
    .reduce((acc, r) => acc + (Number(r.guest_count) || 1), 0);

  // Filtered List
  const filteredRsvps = rsvps.filter((record) => {
    const matchesSearch = record.guest_name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "attending") return matchesSearch && record.attending;
    if (filterStatus === "declined") return matchesSearch && !record.attending;
    return matchesSearch;
  });

  // CSV Export
  const handleExportCsv = () => {
    const headers = ["Guest Name", "Attending", "Guest Count", "Message", "Submission Date"];
    const rows = rsvps.map((r) => [
      `"${r.guest_name.replace(/"/g, '""')}"`,
      r.attending ? "Yes" : "No",
      r.attending ? r.guest_count : 0,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      new Date(r.created_at).toLocaleString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${slug}-rsvp-responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-deep-night text-ivory-cream p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-antique-gold/25 pb-4">
          <Link
            href={`/birthday/${slug}`}
            className="inline-flex items-center space-x-1.5 text-xs text-antique-gold hover:text-gold-light transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Digital Invitation</span>
          </Link>
          <span className="text-xs uppercase tracking-widest text-gold-light/75 font-semibold">
            Elora Moments • Client Portal
          </span>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto py-12 px-6 rounded-3xl bg-dark-card border border-antique-gold/40 shadow-krishna-depth text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-antique-gold/20 text-antique-gold border border-antique-gold/50 flex items-center justify-center mx-auto shadow-gold-glow">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-bold text-ivory-cream">
                Private RSVP Results
              </h2>
              <p className="text-xs sm:text-sm text-gold-light/80">
                Please enter your private invitation access passcode for{" "}
                <span className="font-semibold text-antique-gold capitalize">{slug}</span>.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-gold-light block mb-1">
                  Client Passcode
                </label>
                <input
                  type="password"
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-3 rounded-xl bg-deep-night/90 border border-antique-gold/40 text-ivory-cream text-sm focus:outline-none focus:border-antique-gold"
                />
                <p className="text-[11px] text-antique-gold/80 mt-1.5">
                  Demo passcode hint: <code className="font-mono bg-deep-night px-1.5 py-0.5 rounded border border-antique-gold/30">{slug}2027</code>
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-antique-gold to-gold-dark text-deep-night font-bold text-sm tracking-wide shadow-gold-glow hover:opacity-95 transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "View Guest Responses"}
              </button>
            </form>
          </div>
        ) : (
          /* RSVP Dashboard Content */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream capitalize">
                  {slug}&apos;s Birthday RSVPs
                </h1>
                <p className="text-xs text-gold-light/80 mt-0.5">
                  {isDemoMode ? "Showing Local In-Memory Demo Storage" : "Connected to Supabase PostgreSQL"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-antique-gold text-deep-night font-bold text-xs shadow-md hover:bg-gold-light transition-colors self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export Guest List (CSV)</span>
              </button>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-dark-card border border-antique-gold/30">
                <span className="text-xs text-antique-gold uppercase tracking-wider font-semibold">
                  Total RSVPs
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-ivory-cream mt-1">
                  {totalResponses}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-emerald-500/30">
                <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                  Attending
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300 mt-1">
                  {attendingCount}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-rose-500/30">
                <span className="text-xs text-rose-400 uppercase tracking-wider font-semibold">
                  Declined
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-rose-300 mt-1">
                  {declinedCount}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-card border border-antique-gold/40">
                <span className="text-xs text-gold-light uppercase tracking-wider font-semibold">
                  Total Guests Attending
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold gold-text-gradient mt-1">
                  {totalHeadcount}
                </p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-deep-night/80 border border-antique-gold/30">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-antique-gold absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search guest name..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-deep-night border border-antique-gold/30 text-xs text-ivory-cream focus:outline-none focus:border-antique-gold"
                />
              </div>

              <div className="flex items-center space-x-1.5 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-antique-gold mr-1" />
                {(["all", "attending", "declined"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilterStatus(status)}
                    className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      filterStatus === status
                        ? "bg-antique-gold text-deep-night"
                        : "bg-deep-night/60 text-ivory-cream/70 hover:text-ivory-cream"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Response Cards / Table */}
            {filteredRsvps.length === 0 ? (
              <div className="py-12 text-center text-ivory-cream/60 rounded-2xl border border-antique-gold/20 bg-deep-night/50">
                <Users className="w-8 h-8 text-antique-gold/40 mx-auto mb-2" />
                <p className="text-sm">No RSVP responses match your criteria.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRsvps.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 sm:p-5 rounded-2xl bg-dark-card border border-antique-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-antique-gold/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-serif font-bold text-ivory-cream">
                          {record.guest_name}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            record.attending
                              ? "bg-emerald-900/60 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-900/60 text-rose-300 border border-rose-500/40"
                          }`}
                        >
                          {record.attending ? "Attending" : "Declined"}
                        </span>
                      </div>

                      {record.message && (
                        <p className="text-xs text-gold-light/90 italic font-sans">
                          “{record.message}”
                        </p>
                      )}

                      <span className="text-[11px] text-ivory-cream/50 block font-mono">
                        Submitted: {new Date(record.created_at).toLocaleString()}
                      </span>
                    </div>

                    {record.attending && (
                      <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-antique-gold/20 pt-2 sm:pt-0">
                        <span className="text-xs text-antique-gold font-semibold uppercase">
                          Guests:
                        </span>
                        <span className="text-xl sm:text-2xl font-serif font-black gold-text-gradient">
                          {record.guest_count}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

