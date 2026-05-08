/*
  # Create consultation bookings table

  1. New Tables
    - `consultation_bookings`
      - `id` (uuid, primary key) - unique booking identifier
      - `name` (text) - client's full name
      - `email` (text) - contact email
      - `phone` (text) - contact phone
      - `consultation_type` (text) - type of consultation (normal, urgent, couple, medical, vastu)
      - `format` (text) - audio or video
      - `message` (text) - additional notes from client
      - `status` (text) - booking status (pending, confirmed, completed, cancelled)
      - `created_at` (timestamptz) - record creation timestamp
  2. Security
    - Enable RLS on `consultation_bookings` table
    - Allow anonymous users to INSERT bookings (public lead capture)
    - No public SELECT / UPDATE / DELETE policies (admins access via service role)
*/

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  consultation_type text NOT NULL DEFAULT 'normal',
  format text NOT NULL DEFAULT 'video',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON consultation_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
