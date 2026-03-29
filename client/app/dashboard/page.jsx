export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">Resume Score: 78%</div>

        <div className="p-4 bg-white rounded-xl shadow">Interviews Done: 5</div>

        <div className="p-4 bg-white rounded-xl shadow">Progress: 60%</div>
      </div>
    </div>
  );
}
