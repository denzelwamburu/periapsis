'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { mockSatellites } from '@/data/mockSatellites';
import { useSelectionStore } from '@/stores/selectionStore';
import { useTimeStore } from '@/stores/timeStore';
import { ORBIT_COLORS, Satellite } from '@/types/satellite';

// Simple orbital simulation for demo
function getSatellitePosition(satellite: Satellite, time: Date): THREE.Vector3 {
    // Simplified orbital mechanics for demo purposes
    // Extract approximate parameters from TLE
    const noradId = satellite.noradId;
    const timeOffset = time.getTime() / 1000;

    // Different orbital parameters based on orbit type
    let altitude: number;
    let inclination: number;
    let period: number;

    switch (satellite.orbitType) {
        case 'LEO':
            altitude = 1.05 + (noradId % 10) * 0.01; // ~400km above surface
            inclination = 30 + (noradId % 60); // Varied inclination
            period = 5400; // ~90 min orbit
            break;
        case 'MEO':
            altitude = 1.8 + (noradId % 5) * 0.1; // ~20,000km
            inclination = 55 + (noradId % 10);
            period = 43200; // ~12 hour orbit
            break;
        case 'GEO':
            altitude = 5.6; // ~35,786km (scaled)
            inclination = 0.1 + (noradId % 5);
            period = 86400; // 24 hour orbit
            break;
        default:
            altitude = 2.0;
            inclination = 45;
            period = 20000;
    }

    // Unique phase for each satellite
    const phase = (noradId * 137.5) % 360;

    // Calculate position
    const orbitalAngle = ((timeOffset / period) * 360 + phase) * (Math.PI / 180);
    const incRad = inclination * (Math.PI / 180);

    // Simple circular orbit
    const x = altitude * Math.cos(orbitalAngle);
    const y = altitude * Math.sin(orbitalAngle) * Math.sin(incRad);
    const z = altitude * Math.sin(orbitalAngle) * Math.cos(incRad);

    return new THREE.Vector3(x, y, z);
}

// Individual satellite marker
function SatelliteMarker({
    satellite,
    position,
    isSelected,
    isHovered,
    onSelect,
    onHover
}: {
    satellite: Satellite;
    position: THREE.Vector3;
    isSelected: boolean;
    isHovered: boolean;
    onSelect: () => void;
    onHover: (hover: boolean) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const color = ORBIT_COLORS[satellite.orbitType];

    // Pulse animation for selected satellite
    useFrame((state) => {
        if (meshRef.current) {
            if (isSelected || isHovered) {
                meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
    });

    const size = isSelected ? 0.04 : isHovered ? 0.035 : 0.025;

    return (
        <group position={position}>
            {/* Main satellite dot */}
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                }}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                    onHover(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                    onHover(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[size, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isSelected ? 1 : 0.9}
                />
            </mesh>

            {/* Glow effect */}
            <mesh>
                <sphereGeometry args={[size * 2, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isSelected ? 0.3 : isHovered ? 0.2 : 0.1}
                />
            </mesh>

            {/* Selection ring */}
            {isSelected && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[size * 2.5, size * 3, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Label on hover/select */}
            {(isHovered || isSelected) && (
                <Html
                    position={[0.08, 0.08, 0]}
                    style={{
                        pointerEvents: 'none',
                    }}
                >
                    <div className="glass-panel px-3 py-2 rounded-lg whitespace-nowrap">
                        <p className="text-sm font-medium text-white">{satellite.name}</p>
                        <p className="text-xs text-gray-400 font-data">#{satellite.noradId}</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Orbit trail for selected satellite
function OrbitTrail({ satellite, time }: { satellite: Satellite; time: Date }) {
    const points = useMemo(() => {
        const trailPoints: [number, number, number][] = [];
        const numPoints = 100;
        const orbitDuration = satellite.orbitType === 'GEO' ? 86400000 : 5400000; // ms

        for (let i = 0; i < numPoints; i++) {
            const t = new Date(time.getTime() + (i / numPoints) * orbitDuration);
            const pos = getSatellitePosition(satellite, t);
            trailPoints.push([pos.x, pos.y, pos.z]);
        }

        return trailPoints;
    }, [satellite, Math.floor(time.getTime() / 10000)]); // Update every 10s

    const color = ORBIT_COLORS[satellite.orbitType];

    return (
        <Line
            points={points}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.4}
        />
    );
}

export function SatelliteMarkers() {
    const {
        selectedSatelliteId,
        hoveredSatelliteId,
        selectSatellite,
        hoverSatellite
    } = useSelectionStore();
    const { simulationTime } = useTimeStore();

    // Calculate all satellite positions
    const satellitePositions = useMemo(() => {
        return mockSatellites.map(sat => ({
            satellite: sat,
            position: getSatellitePosition(sat, simulationTime)
        }));
    }, [simulationTime]);

    const selectedSatellite = mockSatellites.find(s => s.id === selectedSatelliteId);

    return (
        <group>
            {/* Orbit trail for selected satellite */}
            {selectedSatellite && (
                <OrbitTrail
                    satellite={selectedSatellite}
                    time={simulationTime}
                />
            )}

            {/* Satellite markers */}
            {satellitePositions.map(({ satellite, position }) => (
                <SatelliteMarker
                    key={satellite.id}
                    satellite={satellite}
                    position={position}
                    isSelected={selectedSatelliteId === satellite.id}
                    isHovered={hoveredSatelliteId === satellite.id}
                    onSelect={() => selectSatellite(satellite)}
                    onHover={(hover) => hoverSatellite(hover ? satellite.id : null)}
                />
            ))}
        </group>
    );
}
