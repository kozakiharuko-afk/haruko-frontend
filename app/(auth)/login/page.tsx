"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function loginWithDiscord() {
    if (loading) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${location.origin}/`,
      },
    });

    if (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <main className="hk-login-root">
      <div className="hk-login-card">
        {/* Logo */}
        <img
          src="/logo/haruko-logo.png"
          alt="Haruko"
          className="haruko-logo"
        />

        {/* Button */}
        <button
          className="discord-btn"
          onClick={loginWithDiscord}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Login with Discord"}
        </button>
      </div>
    </main>
  );
}
