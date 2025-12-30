export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string;
          candidate_name: string;
          candidate_mobile: string | null;
          candidate_linkedin: string | null;
          candidate_location: string | null;
          current_ctc: string | null;
          expected_ctc: string | null;
          relocation: string | null;
          resume_text: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          candidate_name: string;
          candidate_mobile?: string | null;
          candidate_linkedin?: string | null;
          candidate_location?: string | null;
          current_ctc?: string | null;
          expected_ctc?: string | null;
          relocation?: string | null;
          resume_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          candidate_name?: string;
          candidate_mobile?: string | null;
          candidate_linkedin?: string | null;
          candidate_location?: string | null;
          current_ctc?: string | null;
          expected_ctc?: string | null;
          relocation?: string | null;
          resume_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      job_descriptions: {
        Row: {
          id: string;
          role_title: string;
          company_name: string | null;
          description: string;
          required_skills: string[];
          preferred_skills: string[];
          experience_required: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          role_title: string;
          company_name?: string | null;
          description: string;
          required_skills?: string[];
          preferred_skills?: string[];
          experience_required?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          role_title?: string;
          company_name?: string | null;
          description?: string;
          required_skills?: string[];
          preferred_skills?: string[];
          experience_required?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
      };
      analyses: {
        Row: {
          id: string;
          candidate_id: string | null;
          job_description_id: string | null;
          overall_score: number | null;
          ai_recommendation: string | null;
          three_bullet_summary: Record<string, any>;
          career_gap: string | null;
          analyzed_at: string;
          analysis_data: Record<string, any>;
        };
        Insert: {
          id?: string;
          candidate_id?: string | null;
          job_description_id?: string | null;
          overall_score?: number | null;
          ai_recommendation?: string | null;
          three_bullet_summary?: Record<string, any>;
          career_gap?: string | null;
          analyzed_at?: string;
          analysis_data?: Record<string, any>;
        };
        Update: {
          id?: string;
          candidate_id?: string | null;
          job_description_id?: string | null;
          overall_score?: number | null;
          ai_recommendation?: string | null;
          three_bullet_summary?: Record<string, any>;
          career_gap?: string | null;
          analyzed_at?: string;
          analysis_data?: Record<string, any>;
        };
      };
      candidate_skills: {
        Row: {
          id: string;
          candidate_id: string | null;
          skill_name: string;
          years_experience: number | null;
          depth_score: number | null;
          evidence: string | null;
        };
        Insert: {
          id?: string;
          candidate_id?: string | null;
          skill_name: string;
          years_experience?: number | null;
          depth_score?: number | null;
          evidence?: string | null;
        };
        Update: {
          id?: string;
          candidate_id?: string | null;
          skill_name?: string;
          years_experience?: number | null;
          depth_score?: number | null;
          evidence?: string | null;
        };
      };
      company_history: {
        Row: {
          id: string;
          candidate_id: string | null;
          company_name: string;
          company_tier: string | null;
          tier_rationale: string | null;
          tenure_months: number | null;
          role_title: string | null;
          start_date: string | null;
          end_date: string | null;
        };
        Insert: {
          id?: string;
          candidate_id?: string | null;
          company_name: string;
          company_tier?: string | null;
          tier_rationale?: string | null;
          tenure_months?: number | null;
          role_title?: string | null;
          start_date?: string | null;
          end_date?: string | null;
        };
        Update: {
          id?: string;
          candidate_id?: string | null;
          company_name?: string;
          company_tier?: string | null;
          tier_rationale?: string | null;
          tenure_months?: number | null;
          role_title?: string | null;
          start_date?: string | null;
          end_date?: string | null;
        };
      };
      interview_notes: {
        Row: {
          id: string;
          candidate_id: string | null;
          interview_date: string;
          interviewer_name: string | null;
          performance_score: number | null;
          notes: string | null;
          transcript: string | null;
        };
        Insert: {
          id?: string;
          candidate_id?: string | null;
          interview_date?: string;
          interviewer_name?: string | null;
          performance_score?: number | null;
          notes?: string | null;
          transcript?: string | null;
        };
        Update: {
          id?: string;
          candidate_id?: string | null;
          interview_date?: string;
          interviewer_name?: string | null;
          performance_score?: number | null;
          notes?: string | null;
          transcript?: string | null;
        };
      };
      keyword_matches: {
        Row: {
          id: string;
          analysis_id: string | null;
          matched_keywords: string[];
          missing_keywords: string[];
          match_percentage: number | null;
        };
        Insert: {
          id?: string;
          analysis_id?: string | null;
          matched_keywords?: string[];
          missing_keywords?: string[];
          match_percentage?: number | null;
        };
        Update: {
          id?: string;
          analysis_id?: string | null;
          matched_keywords?: string[];
          missing_keywords?: string[];
          match_percentage?: number | null;
        };
      };
    };
  };
}
