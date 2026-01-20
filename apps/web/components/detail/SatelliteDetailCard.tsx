'use client';

import { X, ExternalLink, Clock, MapPin, Orbit, Radio, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelectionStore } from '@/stores/selectionStore';
import { ORBIT_COLORS } from '@/types/satellite';

export function SatelliteDetailCard() {
    const { selectedSatellite, clearSelection } = useSelectionStore();

    if (!selectedSatellite) return null;

    const color = ORBIT_COLORS[selectedSatellite.orbitType];

    // Mock orbital elements (in real app, would parse from TLE)
    const orbitalElements = {
        altitude: selectedSatellite.orbitType === 'LEO' ? '408 km' :
            selectedSatellite.orbitType === 'MEO' ? '20,200 km' : '35,786 km',
        inclination: '51.6°',
        period: selectedSatellite.orbitType === 'LEO' ? '92.8 min' :
            selectedSatellite.orbitType === 'MEO' ? '11.97 hr' : '23.93 hr',
        eccentricity: '0.0006',
        raan: '247.46°',
        velocity: selectedSatellite.orbitType === 'LEO' ? '7.66 km/s' :
            selectedSatellite.orbitType === 'MEO' ? '3.87 km/s' : '3.07 km/s',
    };

    // Mock position data
    const currentPosition = {
        latitude: '23.4° N',
        longitude: '78.2° W',
        altitude: orbitalElements.altitude,
    };

    // TLE epoch age (mock)
    const epochAge = Math.floor(Math.random() * 5) + 1;
    const isStale = epochAge > 3;

    return (
        <div className="absolute right-4 top-4 bottom-20 w-96 glass-panel rounded-xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-white truncate">
                                {selectedSatellite.name}
                            </h2>
                            {selectedSatellite.status === 'active' && (
                                <span className="h-2.5 w-2.5 rounded-full bg-[var(--status-success)] animate-pulse-glow" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-data text-sm text-gray-400">
                                NORAD #{selectedSatellite.noradId}
                            </span>
                            <Badge
                                variant="outline"
                                className="text-xs"
                                style={{
                                    color: color,
                                    borderColor: `${color}40`,
                                    backgroundColor: `${color}10`,
                                }}
                            >
                                {selectedSatellite.orbitType}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearSelection}
                        className="text-gray-400 hover:text-white hover:bg-white/5 -mr-2 -mt-2"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* TLE Epoch Warning */}
                {isStale && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--status-warning)]/10 border border-[var(--status-warning)]/20">
                        <AlertTriangle className="h-4 w-4 text-[var(--status-warning)]" />
                        <span className="text-xs text-[var(--status-warning)]">
                            TLE data is {epochAge} days old
                        </span>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="mx-4 mt-4 bg-white/5">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="orbital" className="text-xs">Orbital</TabsTrigger>
                    <TabsTrigger value="position" className="text-xs">Position</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-0 space-y-4">
                        {/* Mission Info */}
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-400">Mission Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Operator</span>
                                    <span className="text-sm text-white">{selectedSatellite.operator || 'Unknown'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Country</span>
                                    <span className="text-sm text-white">{selectedSatellite.country || 'Unknown'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Purpose</span>
                                    <span className="text-sm text-white">{selectedSatellite.purpose || 'Unknown'}</span>
                                </div>
                                {selectedSatellite.launchDate && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-400">Launch Date</span>
                                        <span className="text-sm text-white font-data">{selectedSatellite.launchDate}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Altitude</p>
                                <p className="text-lg font-data text-[var(--electric-teal)]">{orbitalElements.altitude}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Velocity</p>
                                <p className="text-lg font-data text-[var(--nebula-purple)]">{orbitalElements.velocity}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Period</p>
                                <p className="text-lg font-data text-white">{orbitalElements.period}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-xs text-gray-400">Inclination</p>
                                <p className="text-lg font-data text-white">{orbitalElements.inclination}</p>
                            </div>
                        </div>

                        {/* External Links */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs bg-white/5 border-white/10 hover:bg-white/10"
                                onClick={() => window.open(`https://www.n2yo.com/satellite/?s=${selectedSatellite.noradId}`, '_blank')}
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                N2YO
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs bg-white/5 border-white/10 hover:bg-white/10"
                                onClick={() => window.open(`https://heavens-above.com/satinfo.aspx?satid=${selectedSatellite.noradId}`, '_blank')}
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Heavens Above
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Orbital Tab */}
                    <TabsContent value="orbital" className="mt-0 space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                                    <Orbit className="h-4 w-4" />
                                    Orbital Elements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Semi-major Axis</span>
                                    <span className="text-sm text-white font-data">6,787 km</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Eccentricity</span>
                                    <span className="text-sm text-white font-data">{orbitalElements.eccentricity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Inclination</span>
                                    <span className="text-sm text-white font-data">{orbitalElements.inclination}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">RAAN</span>
                                    <span className="text-sm text-white font-data">{orbitalElements.raan}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Arg. of Perigee</span>
                                    <span className="text-sm text-white font-data">130.54°</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Mean Anomaly</span>
                                    <span className="text-sm text-white font-data">325.03°</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    TLE Epoch
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-data text-white">2024-01-20 12:00:00 UTC</span>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${isStale ? 'border-[var(--status-warning)]/40 text-[var(--status-warning)]' : 'border-[var(--status-success)]/40 text-[var(--status-success)]'}`}
                                    >
                                        {epochAge} days ago
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Position Tab */}
                    <TabsContent value="position" className="mt-0 space-y-4">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Current Position (Geodetic)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Latitude</span>
                                    <span className="text-sm text-white font-data">{currentPosition.latitude}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Longitude</span>
                                    <span className="text-sm text-white font-data">{currentPosition.longitude}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-400">Altitude</span>
                                    <span className="text-sm text-white font-data">{currentPosition.altitude}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                                    <Radio className="h-4 w-4" />
                                    State Vector (ECI)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Position (km)</p>
                                    <p className="text-sm text-white font-data">
                                        X: -4,234.12 | Y: 2,847.56 | Z: 4,102.89
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Velocity (km/s)</p>
                                    <p className="text-sm text-white font-data">
                                        Vx: 5.23 | Vy: -3.87 | Vz: 4.12
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
