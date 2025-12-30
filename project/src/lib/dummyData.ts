import type { AnalysisOutput } from '../types/analysis.types';

export const dummyCandidates: AnalysisOutput[] = [
  {
    candidateBasicDetails: {
      candidateId: 'CND-001',
      candidateName: 'Sarah Chen',
      candidateMobile: '+1-555-0101',
      candidateLinkedIn: 'https://linkedin.com/in/sarahchen',
      roleAppliedFor: 'Senior Frontend Engineer',
      candidateLocation: 'San Francisco, CA',
      aiScreenedOn: new Date('2024-01-15').toISOString(),
      aiCandidateRecommendation: 'Strong Hire',
      candidateResume: 'Resume text...',
      candidateOverallScore: 92,
      currentCTC: '$120,000',
      expectedCTC: '$150,000',
      relocation: 'Yes',
      careerGap: ''
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        'Exceptional frontend engineer with 8+ years of experience in React and TypeScript, demonstrating mastery in building scalable web applications',
        'Strong track record at tier 1 companies including Google and Meta, with proven ability to lead engineering teams',
        'Excellent keyword match (95%) with job requirements, showing comprehensive alignment with all technical requirements'
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'React', yearsExperience: 6, depthScore: 95, evidence: ['Led React migration at Google', 'Built component library'] },
        { skillName: 'TypeScript', yearsExperience: 5, depthScore: 90, evidence: ['TypeScript expert'] },
        { skillName: 'JavaScript', yearsExperience: 8, depthScore: 92, evidence: ['8+ years JS experience'] },
        { skillName: 'Node.js', yearsExperience: 4, depthScore: 78, evidence: ['Backend API development'] },
        { skillName: 'GraphQL', yearsExperience: 3, depthScore: 75, evidence: ['GraphQL API design'] }
      ],
      companyTierAnalysis: [
        { companyName: 'Google', tier: 'Tier 1', rationale: 'Major tech company with global presence', tenureMonths: 36, evidence: ['Software Engineer at Google'] },
        { companyName: 'Acme Corp', tier: 'Tier 2', rationale: 'Established mid-size company', tenureMonths: 24, evidence: ['Senior Developer'] },
        { companyName: 'TechFlow Inc', tier: 'Tier 2', rationale: 'Mid-size product company', tenureMonths: 18, evidence: ['Frontend Engineer'] },
        { companyName: 'StartupXYZ', tier: 'Tier 3', rationale: 'Early stage tech startup', tenureMonths: 12, evidence: ['Software Engineer'] }
      ],
      keywordSkillMatch: {
        matched: ['react', 'typescript', 'javascript', 'frontend', 'node', 'graphql', 'testing', 'ci/cd', 'agile', 'leadership'],
        missing: ['rust', 'golang']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 95,
        skillsMatch: 92,
        certificationsMatch: 85,
        educationMatch: 90,
        experienceMatch: 95,
        skillScore: 90
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  },
  {
    candidateBasicDetails: {
      candidateId: 'CND-002',
      candidateName: 'Michael Rodriguez',
      candidateMobile: '+1-555-0102',
      candidateLinkedIn: 'https://linkedin.com/in/mrodriguez',
      roleAppliedFor: 'Full Stack Developer',
      candidateLocation: 'Austin, TX',
      aiScreenedOn: new Date('2024-01-16').toISOString(),
      aiCandidateRecommendation: 'Consider',
      candidateResume: 'Resume text...',
      candidateOverallScore: 75,
      currentCTC: '$95,000',
      expectedCTC: '$115,000',
      relocation: 'No',
      careerGap: 'Potential 6 month gap detected between 2021 and 2022'
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        'Solid full-stack developer with 5 years experience across multiple technologies including React, Node.js, and PostgreSQL',
        'Mid-level experience at tier 2 companies with good technical foundation but limited exposure to enterprise-scale systems',
        'Moderate keyword match (72%) with some skill gaps in cloud infrastructure and DevOps practices'
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'JavaScript', yearsExperience: 5, depthScore: 80, evidence: ['5 years JS development'] },
        { skillName: 'React', yearsExperience: 3, depthScore: 72, evidence: ['React applications'] },
        { skillName: 'Node.js', yearsExperience: 4, depthScore: 75, evidence: ['Backend services'] },
        { skillName: 'PostgreSQL', yearsExperience: 3, depthScore: 70, evidence: ['Database design'] }
      ],
      companyTierAnalysis: [
        { companyName: 'Amazon', tier: 'Tier 1', rationale: 'Global e-commerce and cloud leader', tenureMonths: 30, evidence: ['Backend Engineer'] },
        { companyName: 'TechCorp Solutions', tier: 'Tier 2', rationale: 'Mid-size product company', tenureMonths: 24, evidence: ['Developer'] },
        { companyName: 'Digital Ventures', tier: 'Tier 2', rationale: 'Mid-size software firm', tenureMonths: 18, evidence: ['Full-stack Developer'] },
        { companyName: 'StartupXYZ', tier: 'Tier 3', rationale: 'Early stage startup', tenureMonths: 12, evidence: ['Software Engineer'] }
      ],
      keywordSkillMatch: {
        matched: ['javascript', 'react', 'node', 'postgresql', 'api', 'testing'],
        missing: ['kubernetes', 'docker', 'aws', 'typescript', 'microservices', 'graphql']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 80,
        skillsMatch: 72,
        certificationsMatch: 60,
        educationMatch: 75,
        experienceMatch: 70,
        skillScore: 74
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  },
  {
    candidateBasicDetails: {
      candidateId: 'CND-003',
      candidateName: 'Priya Sharma',
      candidateMobile: '+91-98765-43210',
      candidateLinkedIn: 'https://linkedin.com/in/priyasharma',
      roleAppliedFor: 'DevOps Engineer',
      candidateLocation: 'Bangalore, India',
      aiScreenedOn: new Date('2024-01-17').toISOString(),
      aiCandidateRecommendation: 'Strong Hire',
      candidateResume: 'Resume text...',
      candidateOverallScore: 88,
      currentCTC: '$55,000',
      expectedCTC: '$75,000',
      relocation: 'Yes',
      careerGap: ''
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        'Highly skilled DevOps engineer with 7 years of experience in cloud infrastructure, CI/CD, and container orchestration',
        'Strong background at Amazon and Stripe with expertise in AWS, Kubernetes, and infrastructure automation',
        'Excellent match (90%) for DevOps role requirements with comprehensive knowledge of modern deployment practices'
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'AWS', yearsExperience: 6, depthScore: 92, evidence: ['AWS certified solutions architect'] },
        { skillName: 'Kubernetes', yearsExperience: 5, depthScore: 88, evidence: ['K8s infrastructure management'] },
        { skillName: 'Docker', yearsExperience: 6, depthScore: 90, evidence: ['Container orchestration'] },
        { skillName: 'Python', yearsExperience: 5, depthScore: 82, evidence: ['Automation scripts'] },
        { skillName: 'Terraform', yearsExperience: 4, depthScore: 85, evidence: ['IaC implementation'] }
      ],
      companyTierAnalysis: [
        { companyName: 'Amazon', tier: 'Tier 1', rationale: 'Global tech giant', tenureMonths: 42, evidence: ['DevOps Engineer'] },
        { companyName: 'CloudTech Solutions', tier: 'Tier 2', rationale: 'Mid-size cloud services provider', tenureMonths: 24, evidence: ['DevOps Engineer'] },
        { companyName: 'DataFlow Systems', tier: 'Tier 2', rationale: 'Mid-size enterprise software', tenureMonths: 18, evidence: ['Infrastructure Engineer'] },
        { companyName: 'TechStart', tier: 'Tier 3', rationale: 'Growing tech startup', tenureMonths: 12, evidence: ['DevOps'] }
      ],
      keywordSkillMatch: {
        matched: ['aws', 'kubernetes', 'docker', 'terraform', 'cicd', 'python', 'linux', 'monitoring', 'ansible', 'jenkins'],
        missing: ['azure', 'gcp']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 92,
        skillsMatch: 90,
        certificationsMatch: 95,
        educationMatch: 85,
        experienceMatch: 88,
        skillScore: 89
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  },
  {
    candidateBasicDetails: {
      candidateId: 'CND-004',
      candidateName: 'James Thompson',
      candidateMobile: '+1-555-0104',
      candidateLinkedIn: 'https://linkedin.com/in/jamesthompson',
      roleAppliedFor: 'Backend Engineer',
      candidateLocation: 'Seattle, WA',
      aiScreenedOn: new Date('2024-01-18').toISOString(),
      aiCandidateRecommendation: 'Consider',
      candidateResume: 'Resume text...',
      candidateOverallScore: 68,
      currentCTC: '$105,000',
      expectedCTC: '$135,000',
      relocation: 'Maybe',
      careerGap: ''
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        'Backend engineer with 4 years experience in Java and Spring Boot, showing competency in microservices architecture',
        'Work experience at tier 2 companies with some exposure to scalable systems but limited high-traffic production experience',
        'Moderate skill alignment (68%) with gaps in modern backend technologies like GraphQL and message queues'
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'Java', yearsExperience: 4, depthScore: 78, evidence: ['Java backend development'] },
        { skillName: 'Spring', yearsExperience: 4, depthScore: 75, evidence: ['Spring Boot microservices'] },
        { skillName: 'PostgreSQL', yearsExperience: 3, depthScore: 70, evidence: ['Database optimization'] },
        { skillName: 'Redis', yearsExperience: 2, depthScore: 65, evidence: ['Caching implementation'] }
      ],
      companyTierAnalysis: [
        { companyName: 'Oracle', tier: 'Tier 1', rationale: 'Major enterprise software company', tenureMonths: 28, evidence: ['Backend Developer'] },
        { companyName: 'Acme Software Inc', tier: 'Tier 2', rationale: 'Mid-size enterprise software', tenureMonths: 24, evidence: ['Java Developer'] },
        { companyName: 'Enterprise Solutions', tier: 'Tier 2', rationale: 'Mid-size software company', tenureMonths: 18, evidence: ['Backend Engineer'] },
        { companyName: 'Tech Innovations', tier: 'Tier 3', rationale: 'Small tech consultancy', tenureMonths: 12, evidence: ['Software Engineer'] }
      ],
      keywordSkillMatch: {
        matched: ['java', 'spring', 'postgresql', 'redis', 'rest', 'microservices'],
        missing: ['graphql', 'kafka', 'elasticsearch', 'mongodb', 'python', 'golang']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 75,
        skillsMatch: 68,
        certificationsMatch: 55,
        educationMatch: 80,
        experienceMatch: 65,
        skillScore: 70
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  },
  {
    candidateBasicDetails: {
      candidateId: 'CND-005',
      candidateName: 'Emily Wong',
      candidateMobile: '+1-555-0105',
      candidateLinkedIn: 'https://linkedin.com/in/emilywong',
      roleAppliedFor: 'Data Scientist',
      candidateLocation: 'Boston, MA',
      aiScreenedOn: new Date('2024-01-19').toISOString(),
      aiCandidateRecommendation: 'Strong Hire',
      candidateResume: 'Resume text...',
      candidateOverallScore: 91,
      currentCTC: '$130,000',
      expectedCTC: '$160,000',
      relocation: 'No',
      careerGap: ''
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        'Outstanding data scientist with PhD in Machine Learning and 6 years industry experience at top-tier tech companies',
        'Proven track record at Microsoft and Netflix building production ML systems serving millions of users',
        'Exceptional skills match (94%) with deep expertise in Python, TensorFlow, and statistical modeling'
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'Python', yearsExperience: 8, depthScore: 95, evidence: ['Python expert'] },
        { skillName: 'Machine Learning', yearsExperience: 6, depthScore: 93, evidence: ['ML model deployment'] },
        { skillName: 'TensorFlow', yearsExperience: 5, depthScore: 90, evidence: ['Deep learning models'] },
        { skillName: 'SQL', yearsExperience: 6, depthScore: 87, evidence: ['Data analysis'] },
        { skillName: 'PyTorch', yearsExperience: 4, depthScore: 85, evidence: ['Neural networks'] }
      ],
      companyTierAnalysis: [
        { companyName: 'Microsoft', tier: 'Tier 1', rationale: 'Global technology leader', tenureMonths: 36, evidence: ['Senior Data Scientist'] },
        { companyName: 'DataCorp Analytics', tier: 'Tier 2', rationale: 'Mid-size data analytics firm', tenureMonths: 24, evidence: ['Data Scientist'] },
        { companyName: 'ML Solutions Inc', tier: 'Tier 2', rationale: 'Mid-size AI/ML company', tenureMonths: 18, evidence: ['ML Engineer'] },
        { companyName: 'AI Startup', tier: 'Tier 3', rationale: 'Machine learning startup', tenureMonths: 12, evidence: ['Data Scientist'] }
      ],
      keywordSkillMatch: {
        matched: ['python', 'machine learning', 'tensorflow', 'pytorch', 'sql', 'statistics', 'deep learning', 'nlp', 'computer vision'],
        missing: ['scala', 'spark']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 95,
        skillsMatch: 94,
        certificationsMatch: 90,
        educationMatch: 100,
        experienceMatch: 92,
        skillScore: 93
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  }
];

for (let i = 6; i <= 20; i++) {
  const names = ['Alex Kumar', 'Jessica Lee', 'David Martinez', 'Sophia Zhang', 'Ryan O\'Brien',
                 'Aisha Patel', 'Chris Anderson', 'Maria Garcia', 'Kevin Nguyen', 'Rachel Cohen',
                 'Mohammed Ali', 'Lisa Park', 'Tom Wilson', 'Nina Ivanova', 'Sam Johnson'];
  const roles = ['Software Engineer', 'Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer'];
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Miami, FL'];
  const recommendations = ['Strong Hire', 'Consider', 'Weak', 'Consider', 'Strong Hire'];
  const scores = [85, 72, 55, 68, 82];

  const idx = (i - 6) % 5;

  dummyCandidates.push({
    candidateBasicDetails: {
      candidateId: `CND-${String(i).padStart(3, '0')}`,
      candidateName: names[idx],
      candidateMobile: `+1-555-0${100 + i}`,
      candidateLinkedIn: `https://linkedin.com/in/${names[idx].toLowerCase().replace(/\s/g, '')}`,
      roleAppliedFor: roles[idx],
      candidateLocation: locations[idx],
      aiScreenedOn: new Date(2024, 0, 14 + i).toISOString(),
      aiCandidateRecommendation: recommendations[idx],
      candidateResume: 'Resume text...',
      candidateOverallScore: scores[idx],
      currentCTC: `$${90000 + (i * 5000)}`,
      expectedCTC: `$${115000 + (i * 5000)}`,
      relocation: i % 2 === 0 ? 'Yes' : 'No',
      careerGap: i % 7 === 0 ? 'Potential 6 month gap detected' : ''
    },
    candidateDetailedSummary: {
      threeBulletSummary: [
        `${idx < 2 ? 'Strong' : 'Moderate'} technical skills with ${3 + idx} years of experience in software development`,
        `Work history includes ${idx === 0 ? 'tier 1' : idx === 1 ? 'tier 2' : 'tier 3'} companies with ${idx < 2 ? 'excellent' : 'adequate'} engineering practices`,
        `Keyword match of ${60 + idx * 8}% with job requirements`
      ],
      candidateInterviewExperience: 'No interview history available.',
      candidateSkillDepthAnalysis: [
        { skillName: 'JavaScript', yearsExperience: 3 + idx, depthScore: 70 + idx * 5, evidence: ['JS development'] },
        { skillName: 'React', yearsExperience: 2 + idx, depthScore: 65 + idx * 5, evidence: ['React apps'] },
        { skillName: 'Node.js', yearsExperience: 2 + idx, depthScore: 68 + idx * 4, evidence: ['Backend APIs'] }
      ],
      companyTierAnalysis: [
        {
          companyName: 'Apple',
          tier: 'Tier 1',
          rationale: 'Global technology leader',
          tenureMonths: 30,
          evidence: ['Software Engineer']
        },
        {
          companyName: 'TechFlow Systems',
          tier: 'Tier 2',
          rationale: 'Mid-size product company',
          tenureMonths: 24,
          evidence: ['Developer']
        },
        {
          companyName: 'Digital Solutions',
          tier: 'Tier 2',
          rationale: 'Mid-size software firm',
          tenureMonths: 18,
          evidence: ['Engineer']
        },
        {
          companyName: 'TechStartup',
          tier: 'Tier 3',
          rationale: 'Early stage startup',
          tenureMonths: 12,
          evidence: ['Software Engineer']
        }
      ],
      keywordSkillMatch: {
        matched: ['javascript', 'react', 'node', 'api', 'testing', 'git'],
        missing: ['kubernetes', 'aws', 'typescript', 'graphql']
      },
      aiRelevancyDetails: {
        jobTitleMatch: 70 + idx * 5,
        skillsMatch: 65 + idx * 6,
        certificationsMatch: 60 + idx * 5,
        educationMatch: 75 + idx * 3,
        experienceMatch: 68 + idx * 5,
        skillScore: 70 + idx * 4
      },
      interviewPerformanceSummary: 'No interview history available.'
    },
    evidence: []
  });
}
