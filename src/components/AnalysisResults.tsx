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
    <div className="bg-gradient-to-b from-gray-50 to-white pb-6">
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-primary/10">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{candidateBasicDetails.candidateName}</h2>
              <p className="text-base font-medium text-gray-700 mb-1">{candidateBasicDetails.roleAppliedFor}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">{candidateBasicDetails.candidateLocation}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-100">
            <div className={`px-5 py-2.5 rounded-xl border-2 ${badge.border} ${badge.bg} ${badge.text} font-bold text-sm shadow-md`}>
              {candidateBasicDetails.aiCandidateRecommendation.toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              {candidateBasicDetails.candidateLinkedIn && (
                <a href={candidateBasicDetails.candidateLinkedIn} target="_blank" rel="noopener noreferrer" className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 hover:scale-110">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 hover:scale-110">
                <Github className="w-4 h-4" />
              </button>
              <button className="p-2.5 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-200 hover:scale-110">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Experience</p>
              <p className="text-base font-bold text-gray-900">{calculateTotalExperience()}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Current CTC</p>
              <p className="text-base font-bold text-gray-900">{candidateBasicDetails.currentCTC || 'N/A'}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Expected CTC</p>
              <p className="text-base font-bold text-gray-900">{candidateBasicDetails.expectedCTC || 'N/A'}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Workplace</p>
              <p className="text-base font-bold text-gray-900">{candidateBasicDetails.relocation === 'Yes' ? 'Remote / Onsite' : 'Onsite'}</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsDrawerOpen(true)}
          className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl shadow-lg border-2 border-primary/30 p-8 cursor-pointer hover:shadow-2xl hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">AI Summary</h3>
                  <p className="text-xs text-gray-600">Click to view detailed analysis</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                View Details
              </button>
            </div>
            <div className="space-y-3">
              {candidateDetailedSummary.threeBulletSummary.slice(0, 2).map((bullet, index) => (
                <div key={index} className="flex gap-3 bg-white/50 p-3 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-1 font-medium">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Candidate Relevancy Details</h3>
          </div>
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

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Professional summary</h3>
          </div>
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

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Keywords and Skills</h3>
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

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Skill depth analysis</h3>
            </div>
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold">{candidateDetailedSummary.candidateSkillDepthAnalysis.length} SKILLS</span>
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

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Company tier analysis</h3>
          </div>
          {tierData.length > 0 && (
            <div className="flex justify-center">
              <PieChart data={tierData} size={200} />
            </div>
          )}
        </div>
      </div>

      <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="AI Summary">
        <div className="space-y-6 animate-fade-in-up">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border-2 border-primary/20 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Candidate Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">AI-powered comprehensive evaluation</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-secondary uppercase tracking-wide mb-4">Key Insights</h4>
            {candidateDetailedSummary.threeBulletSummary.map((bullet, index) => (
              <div key={index} className="flex gap-4 p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <h4 className="text-base font-bold text-secondary uppercase tracking-wide mb-4">Recommendation</h4>
            <div className={`p-6 rounded-2xl border-2 shadow-lg ${
              candidateBasicDetails.aiCandidateRecommendation === 'Strong Hire'
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-500'
                : candidateBasicDetails.aiCandidateRecommendation === 'Consider'
                ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-500'
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-500'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold ${
                  candidateBasicDetails.aiCandidateRecommendation === 'Strong Hire'
                    ? 'text-green-700'
                    : candidateBasicDetails.aiCandidateRecommendation === 'Consider'
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}>
                  {candidateBasicDetails.aiCandidateRecommendation.toUpperCase()}
                </span>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">{candidateBasicDetails.candidateOverallScore}%</p>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Overall Score</p>
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
