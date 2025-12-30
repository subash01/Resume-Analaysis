import { CheckCircle, XCircle, Download, ArrowLeft, Linkedin, Twitter, Github, Globe, User } from 'lucide-react';
import CircularProgress from './CircularProgress';
import GaugeChart from './GaugeChart';
import PieChart from './PieChart';
import type { AnalysisOutput } from '../types/analysis.types';

interface AnalysisResultsProps {
  analysis: AnalysisOutput;
  onNewAnalysis: () => void;
}

export default function AnalysisResults({ analysis, onNewAnalysis }: AnalysisResultsProps) {
  const { candidateBasicDetails, candidateDetailedSummary } = analysis;

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
    color: company.tier === 'Tier 1' ? '#3b82f6' : company.tier === 'Tier 2' ? '#10b981' : '#f59e0b'
  }));

  const tierData = [
    {
      label: 'Startup',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 3').length,
      color: '#ec4899'
    },
    {
      label: 'Mid size',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 2').length,
      color: '#f59e0b'
    },
    {
      label: 'Enterprise',
      value: candidateDetailedSummary.companyTierAnalysis.filter(c => c.tier === 'Tier 1').length,
      color: '#3b82f6'
    }
  ].filter(item => item.value > 0);

  const badge = getRecommendationBadge(candidateBasicDetails.aiCandidateRecommendation);
  const totalYears = parseInt(calculateTotalExperience().split(' ')[0]) || 3;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">AI Resume Screener</h1>
              <nav className="flex items-center gap-6">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Interviews</button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Subscription</button>
              </nav>
            </div>
            <button
              onClick={onNewAnalysis}
              className="px-6 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              New Analysis
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onNewAnalysis} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{candidateBasicDetails.candidateName}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-600">{candidateBasicDetails.roleAppliedFor}</span>
                  <span className="text-sm text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{candidateBasicDetails.candidateLocation}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Screened on: {new Date(candidateBasicDetails.aiScreenedOn).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
          </div>

          <div className="grid grid-cols-5 gap-4 mt-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Total Work Experience</p>
              <p className="text-sm font-bold text-gray-900">{calculateTotalExperience()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Current CTC</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.currentCTC || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Expected CTC</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.expectedCTC || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Expected Joining Date</p>
              <p className="text-sm font-bold text-gray-900">Immediate</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Workplace Preference</p>
              <p className="text-sm font-bold text-gray-900">{candidateBasicDetails.relocation === 'Yes' ? 'Remote / Onsite' : 'Onsite'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-6">
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
                      <span className="text-base font-bold text-green-600">{candidateBasicDetails.candidateOverallScore}%</span>
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
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full mt-1">
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

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Recommended Action</p>
                          <p className="text-xs text-blue-800">
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
          </div>

          <div className="col-span-8 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">AI Summary</h3>
              </div>
              <div className="space-y-3">
                {candidateDetailedSummary.threeBulletSummary.map((bullet, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Skill depth analysis</h3>
                <span className="text-xs text-gray-500">{candidateDetailedSummary.candidateSkillDepthAnalysis.length} SKILLS</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {candidateDetailedSummary.candidateSkillDepthAnalysis.slice(0, 6).map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">{skill.skillName}</span>
                      <span className="text-xs font-bold text-gray-900">{skill.depthScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500"
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
                  <PieChart data={tierData} size={240} />
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Career Gap Analysis</h3>
              {candidateBasicDetails.careerGap ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-orange-900 mb-1">Gap Detected</h4>
                      <p className="text-sm text-orange-800">{candidateBasicDetails.careerGap}</p>
                      <p className="text-xs text-orange-600 mt-2">Reason: Higher education / Personal development</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Gap Duration</p>
                      <p className="text-lg font-bold text-gray-900">{candidateBasicDetails.careerGap.match(/\d+/)?.[0] || '0'} months</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Impact</p>
                      <p className="text-lg font-bold text-orange-600">Moderate</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Explained</p>
                      <p className="text-lg font-bold text-green-600">Yes</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">No Career Gap Detected</p>
                    <p className="text-xs text-gray-500">Candidate has continuous employment history</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
