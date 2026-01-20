// Satellite type definitions
export interface TLE {
    line1: string;
    line2: string;
}

export interface OrbitalElements {
    semiMajorAxis: number; // km
    eccentricity: number;
    inclination: number; // degrees
    raan: number; // Right Ascension of Ascending Node, degrees
    argumentOfPerigee: number; // degrees
    meanAnomaly: number; // degrees
    meanMotion: number; // revolutions per day
    epoch: Date;
}

export interface Position3D {
    x: number;
    y: number;
    z: number;
}

export interface GeodeticPosition {
    latitude: number; // degrees
    longitude: number; // degrees
    altitude: number; // km
}

export type OrbitType = 'LEO' | 'MEO' | 'GEO' | 'HEO';
export type SatelliteStatus = 'active' | 'inactive' | 'debris';

export interface Satellite {
    id: string;
    noradId: number;
    name: string;
    tle: TLE;
    orbitType: OrbitType;
    status: SatelliteStatus;
    operator?: string;
    country?: string;
    launchDate?: string;
    purpose?: string;

    // Computed at runtime
    position?: Position3D;
    geodetic?: GeodeticPosition;
    velocity?: Position3D;
}

export interface SatelliteGroup {
    name: string;
    color: string;
    satellites: string[]; // satellite IDs
}

// Helper function to determine orbit type from altitude
export function getOrbitType(altitudeKm: number): OrbitType {
    if (altitudeKm < 2000) return 'LEO';
    if (altitudeKm < 35786) return 'MEO';
    if (altitudeKm >= 35786 && altitudeKm <= 35800) return 'GEO';
    return 'HEO';
}

// Orbit type colors for visualization
export const ORBIT_COLORS: Record<OrbitType, string> = {
    LEO: '#22d3ee', // Electric teal
    MEO: '#a855f7', // Purple
    GEO: '#f59e0b', // Amber
    HEO: '#ef4444', // Red
};
