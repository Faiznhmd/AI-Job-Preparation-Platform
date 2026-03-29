import Sidebar from '../components/sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
}
