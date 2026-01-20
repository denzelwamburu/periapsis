'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Preload } from '@react-three/drei';
import { Earth } from './Earth';
import { SatelliteMarkers } from './SatelliteMarkers';
import { AtmosphereGlow } from './AtmosphereGlow';

function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[5, 3, 5]}
                intensity={1.5}
                castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4169e1" />

            {/* Stars background */}
            <Stars
                radius={300}
                depth={60}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Earth */}
            <Suspense fallback={null}>
                <Earth />
                <AtmosphereGlow />
            </Suspense>

            {/* Satellites */}
            <SatelliteMarkers />

            {/* Camera Controls */}
            <OrbitControls
                enablePan={false}
                minDistance={1.5}
                maxDistance={10}
                rotateSpeed={0.5}
                zoomSpeed={0.8}
                enableDamping
                dampingFactor={0.05}
            />

            <Preload all />
        </>
    );
}

export function OrbitalViewer() {
    return (
        <div className="h-full w-full bg-[var(--space-black)]">
            <Canvas
                camera={{
                    position: [0, 0, 3],
                    fov: 45,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: false,
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#0a0a0f']} />
                <fog attach="fog" args={['#0a0a0f', 10, 50]} />
                <Scene />
            </Canvas>
        </div>
    );
}
