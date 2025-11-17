import type { ReactNode } from 'react';

export default function LikedVideosLayout({ children, content }: { children?: ReactNode; content?: ReactNode }) {
  return (
    <main className="w-full min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Persistent heading or shell */}
        <h1 className="text-xl font-bold mb-4 mt-2">Liked Videos</h1>

        {/* Parallel slot content */}
        {content}

        {/* children (if page.tsx has content) */}
        {children}
      </div>
    </main>
  );
}
