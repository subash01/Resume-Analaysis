import { useState } from 'react';
import { FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { dummyCandidates } from '../lib/dummyData';
import RightDrawer from './RightDrawer';
import AnalysisResults from './AnalysisResults';
import type { AnalysisOutput } from '../types/analysis.types';

export default function CandidatesList() {
  const [selectedCandidate, setSelectedCandidate] = useState<AnalysisOutput | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSummary = (candidate: AnalysisOutput) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-5 h-5 text-primary" />;
    if (score >= 60) return <Minus className="w-5 h-5 text-yellow-600" />;
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary bg-primary/10';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRecommendationBadge = (recommendation: string) => {
    const badges = {
      'Strong Hire': 'bg-green-100 text-green-700 border-green-300',
      'Consider': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Weak': 'bg-orange-100 text-orange-700 border-orange-300',
      'Reject': 'bg-red-100 text-red-700 border-red-300'
    };
    return badges[recommendation as keyof typeof badges] || badges['Consider'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">AI Resume Screener</h1>
              </div>
              <nav className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg shadow-sm transition-all duration-200">Dashboard</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-200">Interviews</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-200">Subscription</button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Candidates</h2>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold">{dummyCandidates.length}</span>
              candidates screened
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Recommendation</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Screened</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dummyCandidates.map((candidate, index) => (
                  <tr
                    key={candidate.candidateBasicDetails.candidateId}
                    className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                          <span className="text-white font-bold text-sm">
                            {candidate.candidateBasicDetails.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{candidate.candidateBasicDetails.candidateName}</p>
                          <p className="text-xs text-gray-500 font-mono">{candidate.candidateBasicDetails.candidateId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-gray-900">{candidate.candidateBasicDetails.roleAppliedFor}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">{candidate.candidateBasicDetails.candidateLocation}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(candidate.candidateBasicDetails.candidateOverallScore)}
                        <span className={`text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm ${getScoreColor(candidate.candidateBasicDetails.candidateOverallScore)}`}>
                          {candidate.candidateBasicDetails.candidateOverallScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border-2 shadow-sm ${getRecommendationBadge(candidate.candidateBasicDetails.aiCandidateRecommendation)}`}>
                        {candidate.candidateBasicDetails.aiCandidateRecommendation}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600 font-medium">
                          {new Date(candidate.candidateBasicDetails.aiScreenedOn).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => handleViewSummary(candidate)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        <FileText className="w-4 h-4" />
                        View Analysis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RightDrawer isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedCandidate && (
          <AnalysisResults
            analysis={selectedCandidate}
            onNewAnalysis={handleCloseModal}
          />
        )}
      </RightDrawer>
    </div>
  );
}
