'use client';

import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout/AppShell';
import { SatelliteDetailCard } from '@/components/detail/SatelliteDetailCard';

// Dynamically import Three.js component to avoid SSR issues
const OrbitalViewer = dynamic(
  () => import('@/components/three/OrbitalViewer').then((mod) => mod.OrbitalViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[var(--space-black)]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-[var(--nebula-purple)]/30 border-t-[var(--nebula-purple)] animate-spin" />
          <p className="mt-4 text-gray-400">Initializing orbital view...</p>
        </div>
      </div>
    ),
  }
);

export default function CommandCenter() {
  return (
    <AppShell>
      {/* 3D Globe Viewer */}
      <OrbitalViewer />

      {/* Satellite Detail Card (overlay) */}
      <SatelliteDetailCard />
    </AppShell>
  );
}
