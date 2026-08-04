import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  created_at: string;
}

export const MAX_STICKERS = 100;
export const MIN_PLACE_INTERVAL_MS = 5000;

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export function canPlace(): { ok: boolean; reason?: string } {
  const last = Number(localStorage.getItem('scrapbook:lastPlace') ?? 0);
  const now = Date.now();
  if (now - last < MIN_PLACE_INTERVAL_MS) {
    return { ok: false, reason: 'slow down — one sticker every few seconds' };
  }
  return { ok: true };
}

export function recordPlacement() {
  localStorage.setItem('scrapbook:lastPlace', String(Date.now()));
}

export function getAdminToken(): string {
  return (import.meta.env.PUBLIC_STICKER_ADMIN_TOKEN as string | undefined) ?? '';
}
