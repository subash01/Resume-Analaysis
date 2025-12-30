import { useState } from 'react';
import { FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { dummyCandidates } from '../lib/dummyData';
import Modal from './Modal';
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
    if (score >= 80) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <Minus className="w-5 h-5 text-yellow-600" />;
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">AI Resume Screener</h1>
              <nav className="flex items-center gap-6">
                <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">Dashboard</button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Interviews</button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Subscription</button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
            <p className="text-sm text-gray-600 mt-1">{dummyCandidates.length} candidates screened</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recommendation</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Screened</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dummyCandidates.map((candidate) => (
                  <tr key={candidate.candidateBasicDetails.candidateId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {candidate.candidateBasicDetails.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{candidate.candidateBasicDetails.candidateName}</p>
                          <p className="text-xs text-gray-500">{candidate.candidateBasicDetails.candidateId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{candidate.candidateBasicDetails.roleAppliedFor}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{candidate.candidateBasicDetails.candidateLocation}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(candidate.candidateBasicDetails.candidateOverallScore)}
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreColor(candidate.candidateBasicDetails.candidateOverallScore)}`}>
                          {candidate.candidateBasicDetails.candidateOverallScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRecommendationBadge(candidate.candidateBasicDetails.aiCandidateRecommendation)}`}>
                        {candidate.candidateBasicDetails.aiCandidateRecommendation}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(candidate.candidateBasicDetails.aiScreenedOn).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewSummary(candidate)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        AI Summary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedCandidate && (
          <AnalysisResults
            analysis={selectedCandidate}
            onNewAnalysis={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
