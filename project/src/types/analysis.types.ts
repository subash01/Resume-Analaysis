export interface CandidateBasicDetails {
  candidateId: string;
  candidateName: string;
  candidateMobile: string;
  candidateLinkedIn: string;
  roleAppliedFor: string;
  candidateLocation: string;
  aiScreenedOn: string;
  aiCandidateRecommendation: string;
  candidateResume: string;
  candidateOverallScore: number;
  currentCTC: string;
  expectedCTC: string;
  relocation: string;
  careerGap: string;
}

export interface SkillDepthAnalysis {
  skillName: string;
  yearsExperience: number;
  depthScore: number;
  evidence: string[];
}

export interface CompanyTierAnalysis {
  companyName: string;
  tier: string;
  rationale: string;
  tenureMonths: number;
  evidence: string[];
}

export interface AIRelevancyDetails {
  jobTitleMatch: number;
  skillsMatch: number;
  certificationsMatch: number;
  educationMatch: number;
  experienceMatch: number;
  skillScore: number;
}

export interface KeywordSkillMatch {
  matched: string[];
  missing: string[];
}

export interface CandidateDetailedSummary {
  threeBulletSummary: string[];
  candidateInterviewExperience: string;
  candidateSkillDepthAnalysis: SkillDepthAnalysis[];
  companyTierAnalysis: CompanyTierAnalysis[];
  keywordSkillMatch: KeywordSkillMatch;
  aiRelevancyDetails: AIRelevancyDetails;
  interviewPerformanceSummary: string;
}

export interface AnalysisOutput {
  candidateBasicDetails: CandidateBasicDetails;
  candidateDetailedSummary: CandidateDetailedSummary;
  evidence: string[];
}
