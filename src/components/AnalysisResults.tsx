import { CheckCircle, XCircle, Download, Linkedin, Twitter, Github, Globe, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import CircularProgress from './CircularProgress';
import GaugeChart from './GaugeChart';
import PieChart from './PieChart';
import RightDrawer from './RightDrawer';
import type { AnalysisOutput } from '../types/analysis.types';

interface AnalysisResultsProps {
  analysis: AnalysisOutput;
  onNewAnalysis: () => void;
}

export default function AnalysisResults({ analysis, onNewAnalysis }: AnalysisResultsProps) {
  const { candidateBasicDetails, candidateDetailedSummary } = analysis;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getRecommendationBadge = (recommendation: string) => {
    const badges = {
      'Strong Hire': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
      'Consider': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' },
      'Weak': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
      'Reject': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' }
    };
    return badges[recommendation as keyof typeof badges] || badges['Consider'];
  };

  const calculateTotalExperience = () => {
    const totalMonths = candidateDetailedSummary.companyTierAnalysis.reduce((sum, c) => sum + c.tenureMonths, 0);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years} years ${months} months`;
  };

  const industryData = candidateDetailedSummary.companyTierAnalysis.map(company => ({
    label: company.companyName,
    value: company.tenureMonths,
    color: company.tier === 'Tier 1' ? '#EE3961' : company.tier === 'Tier 2' ? '#45546E' : '#f59e0b'
  }));

  const tierData = [
    {
      label: 'Startup',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 3').length,
      color: '#f59e0b'
    },
    {
      label: 'Mid size',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 2').length,
      color: '#45546E'
    },
    {
      label: 'Enterprise',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 1').length,
      color: '#EE3961'
    }
  ].filter(item => item.value > 0);

  const badge = getRecommendationBadge(candidateBasicDetails.aiCandidateRecommendation);
  const totalYears = parseInt(calculateTotalExperience().split(' ')[0]) || 3;

  return (
    <div className="bg-gray-50 pb-6">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{candidateBasicDetails.candidateName}</h2>
              <p className="text-sm text-gray-600 mt-0.5">{candidateBasicDetails.roleAppliedFor}</p>
              <p className="text-xs text-gray-500 mt-0.5">{candidateBasicDetails.candidateLocation}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className={`px-4 py-2 rounded-full border-2 ${badge.border} ${badge.bg} ${badge.text} font-semibold text-sm`}>
              {candidateBasicDetails.aiCandidateRecommendation.toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              {candidateBasicDetails.candidateLinkedIn && (
                <a href={candidateBasicDetails.candidateLinkedIn} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </a>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Twitter className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Github className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Globe className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Experience</p>
              <p className="text-sm font-bold text-gray-900">{calculateTotalExperience()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Current CTC</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.currentCTC || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Expected CTC</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.expectedCTC || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Workplace</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.relocation === 'Yes' ? 'Remote / Onsite' : 'Onsite'}</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsDrawerOpen(true)}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl shadow-sm border-2 border-primary/20 p-6 cursor-pointer hover:shadow-lg hover:border-primary/40 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">AI Summary</h3>
            </div>
            <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              View Details
            </button>
          </div>
          <div className="space-y-2">
            {candidateDetailedSummary.threeBulletSummary.slice(0, 2).map((bullet, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-1">{bullet}</p>
              </div>
            ))}
            <p className="text-sm text-primary font-medium pl-8">Click to view full analysis...</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Candidate Relevancy Details</h3>
          <div className="flex justify-center mb-6">
            <CircularProgress
              percentage={candidateBasicDetails.candidateOverallScore}
              size={140}
              strokeWidth={14}
              label="Overall Fit"
            />
          </div>

          <div className="space-y-3">
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-xs font-semibold text-gray-600 mb-3 uppercase">Relevancy Breakdown</h4>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Job Title</p>
                  <p className="text-xs text-gray-500 mt-0.5">Current and previous titles alignment</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{candidateDetailedSummary.aiRelevancyDetails.jobTitleMatch}%</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Skills</p>
                  <p className="text-xs text-gray-500 mt-0.5">Technical and domain expertise match</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{candidateDetailedSummary.aiRelevancyDetails.skillsMatch}%</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Certifications</p>
                  <p className="text-xs text-gray-500 mt-0.5">Professional credentials and training</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{candidateDetailedSummary.aiRelevancyDetails.certificationsMatch}%</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Education</p>
                  <p className="text-xs text-gray-500 mt-0.5">Academic background alignment</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{candidateDetailedSummary.aiRelevancyDetails.educationMatch}%</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Experience</p>
                  <p className="text-xs text-gray-500 mt-0.5">Years and relevance of experience</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{candidateDetailedSummary.aiRelevancyDetails.experienceMatch}%</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 bg-gray-50 -mx-3 px-3 py-3 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900">Overall Relevancy</p>
                  <p className="text-xs text-gray-500 mt-0.5">Weighted average across all categories</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-primary">{candidateBasicDetails.candidateOverallScore}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Resume</h3>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">PDF</span>
                </div>
                <span className="text-sm font-medium text-gray-700">AnyWord resume.pdf</span>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <p className="text-xs text-gray-500 mt-2">Last modified on {new Date(candidateBasicDetails.aiScreenedOn).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Professional summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-2">Age / Job tenure</p>
              <div className="flex items-center gap-4">
                <GaugeChart value={Math.min(totalYears, 10)} max={10} label="" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{calculateTotalExperience()}</p>
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full mt-1">
                    Professional
                  </span>
                </div>
              </div>
            </div>

            {industryData.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Major industry exposure</p>
                <div className="space-y-2">
                  {industryData.slice(0, 4).map((industry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-12 h-6 rounded" style={{ backgroundColor: industry.color }} />
                      <span className="text-xs text-gray-600">{industry.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {candidateBasicDetails.careerGap && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Career Gap Analysis</h3>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold text-orange-700">Attention Required</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Gap Detected</h4>
                    <p className="text-sm text-gray-700">{candidateBasicDetails.careerGap}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-xs font-semibold text-gray-600 mb-3 uppercase">Impact Assessment</h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="text-lg font-bold text-gray-900">
                      {candidateBasicDetails.careerGap.match(/(\d+)\s*(month|year)/i)?.[1] || 'N/A'}{' '}
                      <span className="text-sm font-normal text-gray-600">
                        {candidateBasicDetails.careerGap.match(/month/i) ? 'months' : 'years'}
                      </span>
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Impact Level</p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`w-2 h-6 rounded-sm ${
                              i === 1 ? 'bg-orange-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Low</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-secondary mb-1">Recommended Action</p>
                      <p className="text-xs text-secondary">
                        Discuss during interview to understand the context and any activities during this period such as education, personal development, or consulting work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">Possible Reasons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">Further education or skill development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">Personal or family commitments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">Freelance or consulting work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">Career transition or job search</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Keywords and Skills</h3>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-gray-700">Must-Have</span>
              </div>
              <span className="text-xs font-bold text-green-600">
                {Math.round((candidateDetailedSummary.keywordSkillMatch.matched.length /
                (candidateDetailedSummary.keywordSkillMatch.matched.length + candidateDetailedSummary.keywordSkillMatch.missing.length)) * 100)}%
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidateDetailedSummary.keywordSkillMatch.matched.slice(0, 10).map((keyword, index) => (
                <span key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-gray-700">Nice-to-Have</span>
              </div>
              <span className="text-xs font-bold text-red-600">
                {candidateDetailedSummary.keywordSkillMatch.missing.length} missing
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidateDetailedSummary.keywordSkillMatch.missing.slice(0, 8).map((keyword, index) => (
                <span key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  <XCircle className="w-3 h-3 text-red-600" />
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Skill depth analysis</h3>
            <span className="text-xs text-gray-500">{candidateDetailedSummary.candidateSkillDepthAnalysis.length} SKILLS</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {candidateDetailedSummary.candidateSkillDepthAnalysis.slice(0, 6).map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">{skill.skillName}</span>
                  <span className="text-xs font-bold text-gray-900">{skill.depthScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary/80 to-primary"
                    style={{ width: `${skill.depthScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Company tier analysis</h3>
          {tierData.length > 0 && (
            <div className="flex justify-center">
              <PieChart data={tierData} size={200} />
            </div>
          )}
        </div>
      </div>

      <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="AI Summary">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Candidate Analysis</h3>
                <p className="text-sm text-gray-600">AI-powered comprehensive evaluation</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide">Key Insights</h4>
            {candidateDetailedSummary.threeBulletSummary.map((bullet, index) => (
              <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Recommendation</h4>
            <div className={`p-4 rounded-lg border-2 ${
              candidateBasicDetails.aiCandidateRecommendation === 'Strong Hire'
                ? 'bg-green-50 border-green-500'
                : candidateBasicDetails.aiCandidateRecommendation === 'Consider'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${
                  candidateBasicDetails.aiCandidateRecommendation === 'Strong Hire'
                    ? 'text-green-700'
                    : candidateBasicDetails.aiCandidateRecommendation === 'Consider'
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}>
                  {candidateBasicDetails.aiCandidateRecommendation.toUpperCase()}
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{candidateBasicDetails.candidateOverallScore}%</p>
                  <p className="text-xs text-gray-600">Overall Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">Analysis Date</h4>
            <p className="text-sm text-gray-700">
              Screened on {new Date(candidateBasicDetails.aiScreenedOn).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </RightDrawer>
    </div>
  );
}
