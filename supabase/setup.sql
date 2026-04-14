-- Overtone · 泛音
-- Database setup script
-- Run this in your Supabase SQL Editor

-- Table for storing piano performances
CREATE TABLE piano_performances (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  title text,
  message text,
  notes jsonb NOT NULL,
  duration_ms integer,
  note_count integer,
  performer text NOT NULL DEFAULT 'user' CHECK (performer IN ('user', 'lux')),
  response text
);

-- Enable Row Level Security
ALTER TABLE piano_performances ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (frontend uses Edge Function, but just in case)
CREATE POLICY "Anyone can insert performances"
  ON piano_performances FOR INSERT
  WITH CHECK (true);

-- Allow anonymous read
CREATE POLICY "Anyone can read performances"
  ON piano_performances FOR SELECT
  USING (true);

-- Allow anonymous update (for Lux responses)
CREATE POLICY "Anyone can update performances"
  ON piano_performances FOR UPDATE
  USING (true)
  WITH CHECK (true);
