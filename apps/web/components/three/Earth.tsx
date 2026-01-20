'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export function Earth() {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    // Slow rotation for Earth
    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.02;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.025;
        }
    });

    return (
        <group>
            {/* Main Earth sphere */}
            <Sphere ref={earthRef} args={[1, 64, 64]}>
                <meshPhongMaterial
                    color="#1a5fb4"
                    emissive="#0a2d5e"
                    emissiveIntensity={0.1}
                    shininess={20}
                />
            </Sphere>

            {/* Landmass overlay - create continents effect */}
            <Sphere args={[1.001, 64, 64]}>
                <meshPhongMaterial
                    color="#2d5016"
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </Sphere>

            {/* Cloud layer */}
            <Sphere ref={cloudsRef} args={[1.02, 32, 32]}>
                <meshPhongMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.1}
                    depthWrite={false}
                />
            </Sphere>

            {/* Grid lines for orbital reference */}
            <GridLines />
        </group>
    );
}

function GridLines() {
    // Create latitude lines
    const latitudePoints = useMemo(() => {
        const allPoints: [number, number, number][][] = [];

        for (let lat = -60; lat <= 60; lat += 30) {
            const points: [number, number, number][] = [];
            const radius = Math.cos((lat * Math.PI) / 180) * 1.005;
            const y = Math.sin((lat * Math.PI) / 180) * 1.005;

            for (let lon = 0; lon <= 360; lon += 5) {
                const x = radius * Math.cos((lon * Math.PI) / 180);
                const z = radius * Math.sin((lon * Math.PI) / 180);
                points.push([x, y, z]);
            }

            allPoints.push(points);
        }

        return allPoints;
    }, []);

    // Create longitude lines
    const longitudePoints = useMemo(() => {
        const allPoints: [number, number, number][][] = [];

        for (let lon = 0; lon < 360; lon += 30) {
            const points: [number, number, number][] = [];

            for (let lat = -90; lat <= 90; lat += 5) {
                const radius = Math.cos((lat * Math.PI) / 180) * 1.005;
                const y = Math.sin((lat * Math.PI) / 180) * 1.005;
                const x = radius * Math.cos((lon * Math.PI) / 180);
                const z = radius * Math.sin((lon * Math.PI) / 180);
                points.push([x, y, z]);
            }

            allPoints.push(points);
        }

        return allPoints;
    }, []);

    return (
        <group>
            {latitudePoints.map((points, i) => (
                <Line
                    key={`lat-${i}`}
                    points={points}
                    color="#22d3ee"
                    lineWidth={0.5}
                    transparent
                    opacity={0.08}
                />
            ))}
            {longitudePoints.map((points, i) => (
                <Line
                    key={`lon-${i}`}
                    points={points}
                    color="#22d3ee"
                    lineWidth={0.5}
                    transparent
                    opacity={0.08}
                />
            ))}
        </group>
    );
}
