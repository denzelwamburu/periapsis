'use client';

import {
    Globe,
    Settings,
    Bell,
    Maximize2,
    Radio,
    Wifi
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTimeStore, isLive } from '@/stores/timeStore';

export function Header() {
    const { simulationTime } = useTimeStore();
    const live = isLive(simulationTime);

    return (
        <header className="glass-panel flex h-14 items-center justify-between px-4 border-b border-[var(--glass-border)]">
            {/* Left - Title & Status */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-gradient-to-br from-[var(--nebula-purple)] to-[var(--electric-teal)] p-2">
                        <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">
                            Orbital Command
                        </h1>
                    </div>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--status-success)]/10 border border-[var(--status-success)]/20">
                    <Wifi className="h-3 w-3 text-[var(--status-success)]" />
                    <span className="text-xs font-medium text-[var(--status-success)]">Systems Online</span>
                </div>
            </div>

            {/* Center - Quick Stats */}
            <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                    <p className="text-xs text-gray-400">Tracking</p>
                    <p className="font-data text-lg text-white">12</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                    <p className="text-xs text-gray-400">Active</p>
                    <p className="font-data text-lg text-[var(--status-success)]">11</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                    <p className="text-xs text-gray-400">Debris</p>
                    <p className="font-data text-lg text-[var(--status-warning)]">1</p>
                </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
                {live && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--status-success)]/10 mr-2">
                        <Radio className="h-3 w-3 text-[var(--status-success)] animate-pulse" />
                        <span className="text-xs font-medium text-[var(--status-success)]">LIVE</span>
                    </div>
                )}

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Notifications</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <Maximize2 className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Fullscreen</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <Settings className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </header>
    );
}
