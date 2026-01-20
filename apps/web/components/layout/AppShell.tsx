'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TimeControlBar } from '@/components/time/TimeControlBar';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[var(--space-black)]">
            {/* Left Sidebar - Catalog */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <Header />

                {/* Main Visualization Area */}
                <main className="relative flex-1 overflow-hidden">
                    {children}
                </main>

                {/* Bottom Time Controls */}
                <TimeControlBar />
            </div>
        </div>
    );
}
