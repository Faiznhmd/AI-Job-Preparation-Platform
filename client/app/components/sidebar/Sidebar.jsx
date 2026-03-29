'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menu = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Resume', path: '/dashboard/resume' },
  { name: 'Interview', path: '/dashboard/interview' },
  { name: 'Roadmap', path: '/dashboard/roadmap' },
  { name: 'Progress', path: '/dashboard/progress' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">AI Prep</h1>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`p-2 rounded-lg ${
              pathname === item.path
                ? 'bg-black text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
