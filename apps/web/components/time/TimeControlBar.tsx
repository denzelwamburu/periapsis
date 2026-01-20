'use client';

import { useEffect } from 'react';
import {
    Play,
    Pause,
    RotateCcw,
    Clock,
    Zap,
    Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    useTimeStore,
    SPEED_PRESETS,
    formatSimulationTime,
    isLive
} from '@/stores/timeStore';

export function TimeControlBar() {
    const {
        simulationTime,
        isPlaying,
        playbackSpeed,
        togglePlayback,
        setSpeed,
        syncToNow,
        tick
    } = useTimeStore();

    const live = isLive(simulationTime);

    // Animation loop
    useEffect(() => {
        let animationId: number;

        const animate = () => {
            tick();
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [tick]);

    // Speed index for logarithmic slider
    const speedIndex = SPEED_PRESETS.indexOf(playbackSpeed);
    const handleSpeedChange = (value: number[]) => {
        const index = Math.round(value[0]);
        setSpeed(SPEED_PRESETS[index] || 1);
    };

    return (
        <div className="glass-panel flex h-16 items-center justify-between px-6 border-t border-[var(--glass-border)]">
            {/* Left - Time Display */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-data text-lg text-white tracking-wider">
                        {formatSimulationTime(simulationTime)}
                    </span>
                </div>

                {live ? (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--status-success)]/10 border border-[var(--status-success)]/20">
                        <Radio className="h-3 w-3 text-[var(--status-success)] animate-pulse" />
                        <span className="text-xs font-medium text-[var(--status-success)]">LIVE</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--nebula-purple)]/10 border border-[var(--nebula-purple)]/20">
                        <Zap className="h-3 w-3 text-[var(--nebula-purple)]" />
                        <span className="text-xs font-medium text-[var(--nebula-purple)]">SIMULATION</span>
                    </div>
                )}
            </div>

            {/* Center - Playback Controls */}
            <div className="flex items-center gap-4">
                <TooltipProvider>
                    {/* Sync to Now */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={syncToNow}
                                className="text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <RotateCcw className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Sync to now</TooltipContent>
                    </Tooltip>

                    {/* Play/Pause */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlayback}
                                className={`h-12 w-12 rounded-full transition-all ${isPlaying
                                        ? 'bg-[var(--nebula-purple)]/20 text-[var(--nebula-purple)] hover:bg-[var(--nebula-purple)]/30'
                                        : 'bg-white/5 text-white hover:bg-white/10'
                                    }`}
                            >
                                {isPlaying ? (
                                    <Pause className="h-6 w-6" />
                                ) : (
                                    <Play className="h-6 w-6 ml-0.5" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{isPlaying ? 'Pause' : 'Play'} (Space)</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Right - Speed Control */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 min-w-[200px]">
                    <span className="text-xs text-gray-400">Speed</span>
                    <Slider
                        value={[speedIndex >= 0 ? speedIndex : 0]}
                        onValueChange={handleSpeedChange}
                        min={0}
                        max={SPEED_PRESETS.length - 1}
                        step={1}
                        className="w-32"
                    />
                    <span className="font-data text-sm text-[var(--electric-teal)] min-w-[50px] text-right">
                        {playbackSpeed}x
                    </span>
                </div>

                {/* Speed Presets */}
                <div className="flex items-center gap-1">
                    {SPEED_PRESETS.map((speed) => (
                        <button
                            key={speed}
                            onClick={() => setSpeed(speed)}
                            className={`px-2 py-1 text-xs rounded transition-all ${playbackSpeed === speed
                                    ? 'bg-[var(--electric-teal)]/20 text-[var(--electric-teal)] border border-[var(--electric-teal)]/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {speed}x
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
