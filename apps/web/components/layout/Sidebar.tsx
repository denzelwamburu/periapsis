'use client';

import { useState } from 'react';
import {
    Satellite,
    Search,
    ChevronLeft,
    ChevronRight,
    Star,
    Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { mockSatellites, filterSatellites } from '@/data/mockSatellites';
import { useSelectionStore } from '@/stores/selectionStore';
import { ORBIT_COLORS, OrbitType } from '@/types/satellite';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<OrbitType[]>([]);

    const { selectedSatelliteId, selectSatellite, hoverSatellite } = useSelectionStore();

    const filteredSatellites = filterSatellites(mockSatellites, {
        search: searchQuery,
        orbitTypes: activeFilters.length > 0 ? activeFilters : undefined,
    });

    const toggleFilter = (orbitType: OrbitType) => {
        setActiveFilters(prev =>
            prev.includes(orbitType)
                ? prev.filter(f => f !== orbitType)
                : [...prev, orbitType]
        );
    };

    if (collapsed) {
        return (
            <div className="glass-panel flex w-14 flex-col items-center py-4 border-r border-[var(--glass-border)]">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setCollapsed(false)}
                                className="mb-4 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Expand sidebar</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="mb-4 rounded-lg bg-[var(--nebula-purple)]/20 p-2">
                                <Satellite className="h-5 w-5 text-[var(--nebula-purple)]" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {filteredSatellites.length} satellites
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        );
    }

    return (
        <div className="glass-panel flex w-80 flex-col border-r border-[var(--glass-border)]">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-[var(--nebula-purple)]/20 p-2">
                        <Satellite className="h-5 w-5 text-[var(--nebula-purple)]" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-white">Satellite Catalog</h2>
                        <p className="text-xs text-gray-400">{filteredSatellites.length} objects tracked</p>
                    </div>
                </div>
                <button
                    onClick={() => setCollapsed(true)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            </div>

            <Separator className="bg-white/10" />

            {/* Search */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search satellites..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[var(--electric-teal)]/50"
                    />
                </div>
            </div>

            {/* Orbit Type Filters */}
            <div className="flex flex-wrap gap-2 px-4 pb-4">
                {(['LEO', 'MEO', 'GEO'] as OrbitType[]).map((orbitType) => (
                    <button
                        key={orbitType}
                        onClick={() => toggleFilter(orbitType)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeFilters.includes(orbitType)
                                ? 'bg-opacity-30'
                                : 'bg-opacity-10 opacity-60 hover:opacity-100'
                            }`}
                        style={{
                            backgroundColor: `${ORBIT_COLORS[orbitType]}${activeFilters.includes(orbitType) ? '30' : '15'}`,
                            color: ORBIT_COLORS[orbitType],
                            borderWidth: '1px',
                            borderColor: `${ORBIT_COLORS[orbitType]}40`,
                        }}
                    >
                        {orbitType}
                    </button>
                ))}
                {activeFilters.length > 0 && (
                    <button
                        onClick={() => setActiveFilters([])}
                        className="px-3 py-1 rounded-full text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        Clear
                    </button>
                )}
            </div>

            <Separator className="bg-white/10" />

            {/* Satellite List */}
            <ScrollArea className="flex-1">
                <div className="p-2">
                    {filteredSatellites.map((satellite) => (
                        <button
                            key={satellite.id}
                            onClick={() => selectSatellite(satellite)}
                            onMouseEnter={() => hoverSatellite(satellite.id)}
                            onMouseLeave={() => hoverSatellite(null)}
                            className={`w-full text-left p-3 rounded-lg mb-1 transition-all ${selectedSatelliteId === satellite.id
                                    ? 'bg-[var(--nebula-purple)]/20 border border-[var(--nebula-purple)]/30'
                                    : 'hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white truncate">
                                            {satellite.name}
                                        </span>
                                        {satellite.status === 'active' && (
                                            <span className="h-2 w-2 rounded-full bg-[var(--status-success)] animate-pulse-glow" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="font-data text-xs text-gray-400">
                                            #{satellite.noradId}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {satellite.operator}
                                        </span>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="text-[10px] px-2 py-0"
                                    style={{
                                        color: ORBIT_COLORS[satellite.orbitType],
                                        borderColor: `${ORBIT_COLORS[satellite.orbitType]}40`,
                                        backgroundColor: `${ORBIT_COLORS[satellite.orbitType]}10`,
                                    }}
                                >
                                    {satellite.orbitType}
                                </Badge>
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
