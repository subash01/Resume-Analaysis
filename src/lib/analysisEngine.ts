import type { AnalysisOutput, SkillDepthAnalysis, CompanyTierAnalysis } from '../types/analysis.types';
import type { CandidateInfo } from '../components/ResumeUpload';

const TIER_1_COMPANIES = [
  'google', 'microsoft', 'amazon', 'apple', 'meta', 'facebook', 'netflix', 'tesla',
  'uber', 'airbnb', 'stripe', 'shopify', 'spotify', 'linkedin', 'twitter', 'dropbox',
  'salesforce', 'oracle', 'ibm', 'adobe', 'nvidia', 'intel', 'cisco'
];

const TIER_2_COMPANIES = [
  'startup', 'medium', 'agency', 'consulting', 'software', 'tech', 'digital'
];

export async function analyzeResume(
  resumeText: string,
  jobDescription: string,
  candidateInfo: CandidateInfo
): Promise<AnalysisOutput> {

  const skills = extractSkills(resumeText, jobDescription);
  const companies = extractCompanies(resumeText);
  const experience = extractExperience(resumeText);
  const education = extractEducation(resumeText);
  const careerGap = detectCareerGap(resumeText);

  const skillScore = calculateSkillScore(skills);
  const experienceScore = calculateExperienceScore(experience, jobDescription);
  const educationScore = calculateEducationScore(education, jobDescription);
  const companyScore = calculateCompanyScore(companies);
  const compensationScore = calculateCompensationScore(candidateInfo);
  const interviewScore = 0;
  const gapPenalty = careerGap ? -5 : 0;

  const overallScore = Math.round(
    0.35 * skillScore +
    0.20 * experienceScore +
    0.10 * educationScore +
    0.10 * companyScore +
    0.05 * compensationScore +
    0.15 * interviewScore +
    gapPenalty
  );

  const recommendation = getRecommendation(overallScore);

  const keywordMatch = extractKeywordMatch(resumeText, jobDescription);

  const aiRelevancyDetails = {
    jobTitleMatch: calculateJobTitleMatch(resumeText, jobDescription),
    skillsMatch: Math.round((keywordMatch.matched.length / (keywordMatch.matched.length + keywordMatch.missing.length)) * 100) || 0,
    certificationsMatch: extractCertifications(resumeText, jobDescription),
    educationMatch: educationScore,
    experienceMatch: experienceScore,
    skillScore: skillScore
  };

  const threeBulletSummary = generateThreeBulletSummary(
    overallScore,
    skills,
    companies,
    keywordMatch
  );

  return {
    candidateBasicDetails: {
      candidateId: generateId(),
      candidateName: candidateInfo.name,
      candidateMobile: candidateInfo.mobile,
      candidateLinkedIn: candidateInfo.linkedin,
      roleAppliedFor: extractJobTitle(jobDescription),
      candidateLocation: candidateInfo.location,
      aiScreenedOn: new Date().toISOString(),
      aiCandidateRecommendation: recommendation,
      candidateResume: resumeText,
      candidateOverallScore: overallScore,
      currentCTC: candidateInfo.currentCTC,
      expectedCTC: candidateInfo.expectedCTC,
      relocation: candidateInfo.relocation,
      careerGap: careerGap || ''
    },
    candidateDetailedSummary: {
      threeBulletSummary,
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: skills,
      companyTierAnalysis: companies,
      keywordSkillMatch: keywordMatch,
      aiRelevancyDetails,
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: extractEvidence(resumeText)
  };
}

function extractSkills(resumeText: string, jobDescription: string): SkillDepthAnalysis[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Ruby',
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'GraphQL', 'REST API',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux',
    'Machine Learning', 'AI', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Agile', 'Scrum', 'Leadership', 'Project Management', 'Team Management'
  ];

  const skills: SkillDepthAnalysis[] = [];
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  for (const skill of commonSkills) {
    const skillLower = skill.toLowerCase();
    if (resumeLower.includes(skillLower)) {
      const inJD = jdLower.includes(skillLower);
      const yearsMatch = resumeText.match(new RegExp(`(\\d+)\\+?\\s*(?:years?|yrs?).*${skillLower}|${skillLower}.*?(\\d+)\\+?\\s*(?:years?|yrs?)`, 'i'));
      const years = yearsMatch ? parseInt(yearsMatch[1] || yearsMatch[2]) : estimateExperience(resumeText, skill);

      const occurrences = (resumeText.match(new RegExp(skill, 'gi')) || []).length;
      let depthScore = Math.min(100, 40 + (years * 8) + (occurrences * 3));

      if (inJD) {
        depthScore = Math.min(100, depthScore + 15);
      }

      const evidence = extractSkillEvidence(resumeText, skill);

      skills.push({
        skillName: skill,
        yearsExperience: years,
        depthScore: Math.round(depthScore),
        evidence: evidence
      });
    }
  }

  return skills.sort((a, b) => b.depthScore - a.depthScore).slice(0, 12);
}

function extractSkillEvidence(resumeText: string, skill: string): string[] {
  const lines = resumeText.split('\n');
  const evidence: string[] = [];

  for (const line of lines) {
    if (line.toLowerCase().includes(skill.toLowerCase()) && line.length > 20) {
      evidence.push(line.trim());
      if (evidence.length >= 3) break;
    }
  }

  return evidence;
}

function estimateExperience(resumeText: string, skill: string): number {
  const lines = resumeText.split('\n');
  let totalMonths = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.toLowerCase().includes(skill.toLowerCase())) {
      const datePattern = /(20\d{2}|19\d{2})/g;
      const dates = line.match(datePattern);
      if (dates && dates.length >= 2) {
        const start = parseInt(dates[0]);
        const end = parseInt(dates[dates.length - 1]);
        totalMonths += (end - start) * 12;
      }
    }
  }

  return Math.min(15, Math.max(1, Math.floor(totalMonths / 12)));
}

function extractCompanies(resumeText: string): CompanyTierAnalysis[] {
  const companies: CompanyTierAnalysis[] = [];
  const lines = resumeText.split('\n');

  const companyPatterns = [
    /(?:at|@)\s+([A-Z][A-Za-z\s&,.]+?)(?:\s+[-–|]|\s+\d{4}|\n|$)/g,
    /^([A-Z][A-Za-z\s&,.]+?)\s*[-–|]\s*(?:Software|Engineer|Developer|Manager|Lead|Senior|Junior)/gm
  ];

  const foundCompanies = new Set<string>();

  for (const pattern of companyPatterns) {
    let match;
    while ((match = pattern.exec(resumeText)) !== null) {
      const companyName = match[1].trim().replace(/[,.]$/, '');
      if (companyName.length > 2 && companyName.length < 50) {
        foundCompanies.add(companyName);
      }
    }
  }

  foundCompanies.forEach(companyName => {
    const tier = determineCompanyTier(companyName);
    const tenureMonths = estimateTenure(resumeText, companyName);

    companies.push({
      companyName,
      tier: tier.tier,
      rationale: tier.rationale,
      tenureMonths,
      evidence: [extractCompanyContext(resumeText, companyName)]
    });
  });

  return companies.slice(0, 5);
}

function determineCompanyTier(companyName: string): { tier: string; rationale: string } {
  const nameLower = companyName.toLowerCase();

  for (const tier1 of TIER_1_COMPANIES) {
    if (nameLower.includes(tier1)) {
      return {
        tier: 'Tier 1',
        rationale: 'Major tech company / MNC with global presence and strong brand recognition'
      };
    }
  }

  for (const tier2 of TIER_2_COMPANIES) {
    if (nameLower.includes(tier2)) {
      return {
        tier: 'Tier 3',
        rationale: 'Startup, consulting, or small-medium business'
      };
    }
  }

  if (nameLower.includes('inc') || nameLower.includes('ltd') || nameLower.includes('corp')) {
    return {
      tier: 'Tier 2',
      rationale: 'Established mid-size company with formal structure'
    };
  }

  return {
    tier: 'Tier 2',
    rationale: 'Mid-size product or services company'
  };
}

function estimateTenure(resumeText: string, companyName: string): number {
  const contextLines = extractCompanyContext(resumeText, companyName);
  const yearPattern = /(20\d{2}|19\d{2})/g;
  const years = contextLines.match(yearPattern);

  if (years && years.length >= 2) {
    const start = parseInt(years[0]);
    const end = years[1].toLowerCase().includes('present') ? new Date().getFullYear() : parseInt(years[1]);
    return Math.max(1, (end - start) * 12);
  }

  return 12;
}

function extractCompanyContext(resumeText: string, companyName: string): string {
  const lines = resumeText.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(companyName)) {
      const context = lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 3)).join(' ');
      return context.trim();
    }
  }
  return '';
}

function extractExperience(resumeText: string): { years: number; relevantYears: number } {
  const yearPattern = /(20\d{2}|19\d{2})/g;
  const years = resumeText.match(yearPattern);

  if (years && years.length >= 2) {
    const allYears = years.map(y => parseInt(y)).sort((a, b) => a - b);
    const totalYears = allYears[allYears.length - 1] - allYears[0];
    return {
      years: totalYears,
      relevantYears: Math.min(totalYears, totalYears * 0.8)
    };
  }

  return { years: 0, relevantYears: 0 };
}

function extractEducation(resumeText: string): string[] {
  const degrees = ['PhD', 'Ph.D', 'Master', 'Bachelor', 'MBA', 'B.Tech', 'M.Tech', 'BS', 'MS', 'BE', 'ME'];
  const education: string[] = [];

  for (const degree of degrees) {
    if (resumeText.toLowerCase().includes(degree.toLowerCase())) {
      education.push(degree);
    }
  }

  return education;
}

function detectCareerGap(resumeText: string): string | null {
  const yearPattern = /(20\d{2}|19\d{2})/g;
  const years = resumeText.match(yearPattern);

  if (years && years.length >= 4) {
    const sortedYears = years.map(y => parseInt(y)).sort((a, b) => a - b);

    for (let i = 1; i < sortedYears.length; i++) {
      const gap = sortedYears[i] - sortedYears[i - 1];
      if (gap > 2) {
        return `Potential ${gap * 12} month gap detected between ${sortedYears[i - 1]} and ${sortedYears[i]}`;
      }
    }
  }

  return null;
}

function calculateSkillScore(skills: SkillDepthAnalysis[]): number {
  if (skills.length === 0) return 0;

  const totalScore = skills.reduce((sum, skill) => sum + skill.depthScore, 0);
  return Math.round(totalScore / skills.length);
}

function calculateExperienceScore(experience: { years: number; relevantYears: number }, jobDescription: string): number {
  const jdLower = jobDescription.toLowerCase();
  const requiredYearsMatch = jdLower.match(/(\d+)\+?\s*years?/);
  const requiredYears = requiredYearsMatch ? parseInt(requiredYearsMatch[1]) : 3;

  const relevantRatio = Math.min(1, experience.relevantYears / requiredYears);
  const totalRatio = Math.min(1, experience.years / (requiredYears * 1.5));
  const titleSimilarity = 0.7;

  const score = (0.5 * relevantRatio + 0.3 * totalRatio + 0.2 * titleSimilarity) * 100;
  return Math.round(score);
}

function calculateEducationScore(education: string[], jobDescription: string): number {
  if (education.length === 0) return 50;

  const jdLower = jobDescription.toLowerCase();
  const requiresBachelors = jdLower.includes('bachelor') || jdLower.includes('b.tech') || jdLower.includes('bs') || jdLower.includes('be');
  const requiresMasters = jdLower.includes('master') || jdLower.includes('m.tech') || jdLower.includes('ms') || jdLower.includes('mba');
  const requiresPhD = jdLower.includes('phd') || jdLower.includes('ph.d');

  const hasBachelors = education.some(e => ['bachelor', 'b.tech', 'bs', 'be'].some(d => e.toLowerCase().includes(d)));
  const hasMasters = education.some(e => ['master', 'm.tech', 'ms', 'mba', 'me'].some(d => e.toLowerCase().includes(d)));
  const hasPhD = education.some(e => e.toLowerCase().includes('phd') || e.toLowerCase().includes('ph.d'));

  if (requiresPhD && hasPhD) return 100;
  if (requiresMasters && hasMasters) return 90;
  if (requiresMasters && hasBachelors) return 70;
  if (requiresBachelors && hasBachelors) return 85;
  if (hasBachelors) return 75;

  return 50;
}

function calculateCompanyScore(companies: CompanyTierAnalysis[]): number {
  if (companies.length === 0) return 50;

  const tierValues: { [key: string]: number } = {
    'Tier 1': 1.0,
    'Tier 2': 0.8,
    'Tier 3': 0.6
  };

  let totalScore = 0;
  let totalWeight = 0;

  companies.forEach(company => {
    const tierValue = tierValues[company.tier] || 0.5;
    const weight = Math.min(company.tenureMonths, 36) / 36;
    totalScore += tierValue * weight * 100;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 50;
}

function calculateCompensationScore(candidateInfo: CandidateInfo): number {
  if (!candidateInfo.currentCTC || !candidateInfo.expectedCTC) return 70;

  const currentMatch = candidateInfo.currentCTC.match(/[\d,]+/);
  const expectedMatch = candidateInfo.expectedCTC.match(/[\d,]+/);

  if (!currentMatch || !expectedMatch) return 70;

  const current = parseInt(currentMatch[0].replace(/,/g, ''));
  const expected = parseInt(expectedMatch[0].replace(/,/g, ''));

  const increase = ((expected - current) / current) * 100;

  if (increase < 20) return 90;
  if (increase < 30) return 80;
  if (increase < 50) return 70;
  return 50;
}

function getRecommendation(score: number): string {
  if (score >= 80) return 'Strong Hire';
  if (score >= 60) return 'Consider';
  if (score >= 40) return 'Weak';
  return 'Reject';
}

function extractKeywordMatch(resumeText: string, jobDescription: string) {
  const jdWords = jobDescription
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 3);

  const uniqueJdWords = [...new Set(jdWords)];
  const resumeLower = resumeText.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  uniqueJdWords.forEach(word => {
    if (resumeLower.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  return {
    matched: matched.slice(0, 30),
    missing: missing.slice(0, 30)
  };
}

function calculateJobTitleMatch(resumeText: string, jobDescription: string): number {
  const jdTitle = extractJobTitle(jobDescription).toLowerCase();
  const resumeLower = resumeText.toLowerCase();

  const titleWords = jdTitle.split(/\s+/);
  let matchCount = 0;

  titleWords.forEach(word => {
    if (word.length > 3 && resumeLower.includes(word)) {
      matchCount++;
    }
  });

  return Math.round((matchCount / Math.max(titleWords.length, 1)) * 100);
}

function extractJobTitle(jobDescription: string): string {
  const lines = jobDescription.split('\n');
  const firstLine = lines[0].trim();

  if (firstLine.length > 5 && firstLine.length < 100) {
    return firstLine.replace(/job title:|position:|role:/i, '').trim();
  }

  const titleMatch = jobDescription.match(/(?:position|role|job title):\s*([^\n]+)/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  return 'Software Engineer';
}

function extractCertifications(resumeText: string, jobDescription: string): number {
  const certKeywords = ['certified', 'certification', 'certificate', 'aws', 'azure', 'gcp', 'pmp', 'scrum'];
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  const resumeHasCerts = certKeywords.some(keyword => resumeLower.includes(keyword));
  const jdRequiresCerts = certKeywords.some(keyword => jdLower.includes(keyword));

  if (jdRequiresCerts && resumeHasCerts) return 90;
  if (!jdRequiresCerts) return 75;
  if (jdRequiresCerts && !resumeHasCerts) return 40;

  return 75;
}

function generateThreeBulletSummary(
  overallScore: number,
  skills: SkillDepthAnalysis[],
  companies: CompanyTierAnalysis[],
  keywordMatch: { matched: string[]; missing: string[] }
): string[] {
  const topSkills = skills.slice(0, 5).map(s => s.skillName).join(', ');
  const tier1Companies = companies.filter(c => c.tier === 'Tier 1');
  const matchRate = Math.round((keywordMatch.matched.length / (keywordMatch.matched.length + keywordMatch.missing.length)) * 100);

  const bullets = [];

  if (overallScore >= 80) {
    bullets.push(`Strong candidate with ${overallScore}/100 overall score. Demonstrates excellent proficiency in ${topSkills} with proven track record.`);
  } else if (overallScore >= 60) {
    bullets.push(`Solid candidate with ${overallScore}/100 overall score. Shows competency in ${topSkills} with room for growth.`);
  } else {
    bullets.push(`Below-average candidate with ${overallScore}/100 overall score. Limited proficiency in required areas including ${topSkills}.`);
  }

  if (tier1Companies.length > 0) {
    bullets.push(`Has valuable experience at ${tier1Companies.length} Tier 1 ${tier1Companies.length === 1 ? 'company' : 'companies'} (${tier1Companies.map(c => c.companyName).join(', ')}), indicating exposure to high-quality engineering practices.`);
  } else {
    bullets.push(`Work experience primarily at Tier 2-3 companies. May need additional mentoring to adapt to enterprise-level best practices.`);
  }

  if (matchRate >= 70) {
    bullets.push(`Excellent keyword match (${matchRate}%) with job requirements. Resume aligns well with role expectations and required skill set.`);
  } else if (matchRate >= 50) {
    bullets.push(`Moderate keyword match (${matchRate}%) with job requirements. Some skill gaps identified but candidate shows transferable experience.`);
  } else {
    bullets.push(`Low keyword match (${matchRate}%) with job requirements. Significant skill gaps in ${keywordMatch.missing.slice(0, 5).join(', ')}. May not be ideal fit for this role.`);
  }

  return bullets;
}

function extractEvidence(resumeText: string): string[] {
  const lines = resumeText.split('\n').filter(line => line.trim().length > 30);
  return lines.slice(0, 20);
}

function generateId(): string {
  return `CND-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}
