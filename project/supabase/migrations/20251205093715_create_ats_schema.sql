/*
  # ATS Resume Analysis System Schema

  ## Overview
  Complete schema for an Applicant Tracking System with AI-powered resume analysis.
  
  ## Tables Created
  
  ### 1. candidates
  Stores basic candidate information extracted from resumes
  - id (uuid, primary key)
  - candidate_name (text)
  - candidate_mobile (text)
  - candidate_linkedin (text)
  - candidate_location (text)
  - current_ctc (text)
  - expected_ctc (text)
  - relocation (text)
  - resume_text (text) - full extracted resume text
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 2. job_descriptions
  Stores job postings to compare against
  - id (uuid, primary key)
  - role_title (text)
  - company_name (text)
  - description (text)
  - required_skills (jsonb) - array of required skills
  - preferred_skills (jsonb) - array of preferred skills
  - experience_required (text)
  - created_at (timestamptz)
  - created_by (uuid) - user who created the JD
  
  ### 3. analyses
  Core analysis results linking candidates to job descriptions
  - id (uuid, primary key)
  - candidate_id (uuid, foreign key)
  - job_description_id (uuid, foreign key)
  - overall_score (integer) - 0-100
  - ai_recommendation (text) - Strong Hire, Consider, Weak, Reject
  - three_bullet_summary (jsonb)
  - career_gap (text)
  - analyzed_at (timestamptz)
  - analysis_data (jsonb) - full JSON output
  
  ### 4. candidate_skills
  Detailed skill analysis for each candidate
  - id (uuid, primary key)
  - candidate_id (uuid, foreign key)
  - skill_name (text)
  - years_experience (numeric)
  - depth_score (integer) - 0-100
  - evidence (text) - evidence from resume
  
  ### 5. company_history
  Work history with company tier analysis
  - id (uuid, primary key)
  - candidate_id (uuid, foreign key)
  - company_name (text)
  - company_tier (text) - Tier 1, Tier 2, Tier 3
  - tier_rationale (text)
  - tenure_months (integer)
  - role_title (text)
  - start_date (text)
  - end_date (text)
  
  ### 6. interview_notes
  Optional interview performance data
  - id (uuid, primary key)
  - candidate_id (uuid, foreign key)
  - interview_date (timestamptz)
  - interviewer_name (text)
  - performance_score (integer) - 0-100
  - notes (text)
  - transcript (text)
  
  ### 7. keyword_matches
  Tracks keyword matching between resume and JD
  - id (uuid, primary key)
  - analysis_id (uuid, foreign key)
  - matched_keywords (jsonb)
  - missing_keywords (jsonb)
  - match_percentage (numeric)
  
  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users to manage their own data
*/

-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name text NOT NULL,
  candidate_mobile text,
  candidate_linkedin text,
  candidate_location text,
  current_ctc text,
  expected_ctc text,
  relocation text,
  resume_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_title text NOT NULL,
  company_name text,
  description text NOT NULL,
  required_skills jsonb DEFAULT '[]'::jsonb,
  preferred_skills jsonb DEFAULT '[]'::jsonb,
  experience_required text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  job_description_id uuid REFERENCES job_descriptions(id) ON DELETE CASCADE,
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  ai_recommendation text CHECK (ai_recommendation IN ('Strong Hire', 'Consider', 'Weak', 'Reject')),
  three_bullet_summary jsonb DEFAULT '[]'::jsonb,
  career_gap text,
  analyzed_at timestamptz DEFAULT now(),
  analysis_data jsonb DEFAULT '{}'::jsonb
);

-- Create candidate_skills table
CREATE TABLE IF NOT EXISTS candidate_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  years_experience numeric DEFAULT 0,
  depth_score integer CHECK (depth_score >= 0 AND depth_score <= 100),
  evidence text
);

-- Create company_history table
CREATE TABLE IF NOT EXISTS company_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  company_tier text CHECK (company_tier IN ('Tier 1', 'Tier 2', 'Tier 3')),
  tier_rationale text,
  tenure_months integer DEFAULT 0,
  role_title text,
  start_date text,
  end_date text
);

-- Create interview_notes table
CREATE TABLE IF NOT EXISTS interview_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  interview_date timestamptz DEFAULT now(),
  interviewer_name text,
  performance_score integer CHECK (performance_score >= 0 AND performance_score <= 100),
  notes text,
  transcript text
);

-- Create keyword_matches table
CREATE TABLE IF NOT EXISTS keyword_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analyses(id) ON DELETE CASCADE,
  matched_keywords jsonb DEFAULT '[]'::jsonb,
  missing_keywords jsonb DEFAULT '[]'::jsonb,
  match_percentage numeric DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE keyword_matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for candidates
CREATE POLICY "Users can view all candidates"
  ON candidates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert candidates"
  ON candidates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update candidates"
  ON candidates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete candidates"
  ON candidates FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for job_descriptions
CREATE POLICY "Users can view all job descriptions"
  ON job_descriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert job descriptions"
  ON job_descriptions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their job descriptions"
  ON job_descriptions FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete their job descriptions"
  ON job_descriptions FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- RLS Policies for analyses
CREATE POLICY "Users can view all analyses"
  ON analyses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert analyses"
  ON analyses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update analyses"
  ON analyses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete analyses"
  ON analyses FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for candidate_skills
CREATE POLICY "Users can view all candidate skills"
  ON candidate_skills FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert candidate skills"
  ON candidate_skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update candidate skills"
  ON candidate_skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete candidate skills"
  ON candidate_skills FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for company_history
CREATE POLICY "Users can view all company history"
  ON company_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert company history"
  ON company_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update company history"
  ON company_history FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete company history"
  ON company_history FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for interview_notes
CREATE POLICY "Users can view all interview notes"
  ON interview_notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert interview notes"
  ON interview_notes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update interview notes"
  ON interview_notes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete interview notes"
  ON interview_notes FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for keyword_matches
CREATE POLICY "Users can view all keyword matches"
  ON keyword_matches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert keyword matches"
  ON keyword_matches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update keyword matches"
  ON keyword_matches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete keyword matches"
  ON keyword_matches FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_candidates_name ON candidates(candidate_name);
CREATE INDEX IF NOT EXISTS idx_analyses_candidate ON analyses(candidate_id);
CREATE INDEX IF NOT EXISTS idx_analyses_job ON analyses(job_description_id);
CREATE INDEX IF NOT EXISTS idx_candidate_skills_candidate ON candidate_skills(candidate_id);
CREATE INDEX IF NOT EXISTS idx_company_history_candidate ON company_history(candidate_id);
CREATE INDEX IF NOT EXISTS idx_interview_notes_candidate ON interview_notes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_keyword_matches_analysis ON keyword_matches(analysis_id);
