-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Creates the shared sticker board table with row-level security.

create table if not exists public.stickers (
  id bigint generated always as identity primary key,
  emoji text not null,
  x numeric not null,
  y numeric not null,
  rotation numeric not null default 0,
  created_at timestamptz not null default now()
);

alter table public.stickers enable row level security;

-- drop first so this script can be re-run safely
drop policy if exists "stickers_read" on public.stickers;
drop policy if exists "stickers_insert" on public.stickers;
drop policy if exists "stickers_update" on public.stickers;
-- anyone can delete (the admin page uses the anon key; the token in the
-- bundle is obfuscation, not real auth — the wall is a play wall)
drop policy if exists "stickers_delete" on public.stickers;
create policy "stickers_delete" on public.stickers
  for delete using (true);

-- anyone can read the board
create policy "stickers_read" on public.stickers
  for select using (true);

-- anyone can add a sticker
create policy "stickers_insert" on public.stickers
  for insert with check (true);

-- anyone can move a sticker (the wall is a play wall)
create policy "stickers_update" on public.stickers
  for update using (true) with check (true);

-- anyone can delete (admin page uses the anon key)
create policy "stickers_delete" on public.stickers
  for delete using (true);

-- optional: keep the board bounded by deleting the oldest stickers
-- beyond the newest 300 (run on a schedule or manually):
-- delete from public.stickers
--   where id in (
--     select id from public.stickers
--     order by created_at desc
--     offset 300
--   );
