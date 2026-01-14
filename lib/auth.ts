import { supabase } from "./supabase";

export async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
