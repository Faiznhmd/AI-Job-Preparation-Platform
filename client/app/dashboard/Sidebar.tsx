'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menu = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Resume', path: '/dashboard/resume' },
  { name: 'Interview', path: '/dashboard/interview' },
  { name: 'Mock Interview', path: '/dashboard/mock' },
  { name: 'Roadmap', path: '/dashboard/roadmap' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 p-5 border-r border-gray-800">
      <Link className="text-xl font-bold mb-6" href="/">
        AI Prep
      </Link>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`p-3 rounded-lg cursor-pointer ${
                pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
