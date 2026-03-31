export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back 👋</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="font-semibold">Resume Analysis</h2>
          <p className="text-gray-400 text-sm mt-2">
            Upload & analyze your resume
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="font-semibold">Mock Interview</h2>
          <p className="text-gray-400 text-sm mt-2">
            Practice with AI interviewer
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h2 className="font-semibold">Roadmap</h2>
          <p className="text-gray-400 text-sm mt-2">
            Get personalized learning plan
          </p>
        </div>
      </div>
    </div>
  );
}
