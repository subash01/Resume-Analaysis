import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface ResumeUploadProps {
  onAnalyze: (resumeText: string, jobDescription: string, candidateInfo: CandidateInfo) => Promise<void>;
  isAnalyzing: boolean;
}

export interface CandidateInfo {
  name: string;
  mobile: string;
  linkedin: string;
  location: string;
  currentCTC: string;
  expectedCTC: string;
  relocation: string;
}

export default function ResumeUpload({ onAnalyze, isAnalyzing }: ResumeUploadProps) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    name: '',
    mobile: '',
    linkedin: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    relocation: 'No'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert('Please provide both resume text and job description');
      return;
    }
    await onAnalyze(resumeText, jobDescription, candidateInfo);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Analysis System</h1>
            <p className="text-gray-600">Upload resume and job description for AI-powered analysis</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Candidate Name
              </label>
              <input
                type="text"
                value={candidateInfo.name}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter candidate name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                value={candidateInfo.mobile}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, mobile: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="text"
                value={candidateInfo.linkedin}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="LinkedIn URL"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={candidateInfo.location}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current CTC
              </label>
              <input
                type="text"
                value={candidateInfo.currentCTC}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, currentCTC: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $80,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected CTC
              </label>
              <input
                type="text"
                value={candidateInfo.expectedCTC}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, expectedCTC: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $100,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Open to Relocation
              </label>
              <select
                value={candidateInfo.relocation}
                onChange={(e) => setCandidateInfo({ ...candidateInfo, relocation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Paste the candidate's resume text here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Paste the job description here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Analyze Resume
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
