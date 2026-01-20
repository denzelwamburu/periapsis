import { Satellite } from '@/types/satellite';

// Real TLE data for demo satellites
export const mockSatellites: Satellite[] = [
    {
        id: 'iss',
        noradId: 25544,
        name: 'ISS (ZARYA)',
        tle: {
            line1: '1 25544U 98067A   24020.50000000  .00016717  00000-0  30000-3 0  9993',
            line2: '2 25544  51.6400 247.4627 0006703 130.5360 325.0288 15.49815000 34567',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'NASA/Roscosmos',
        country: 'International',
        launchDate: '1998-11-20',
        purpose: 'Space Station',
    },
    {
        id: 'hubble',
        noradId: 20580,
        name: 'HST (Hubble)',
        tle: {
            line1: '1 20580U 90037B   24020.50000000  .00000850  00000-0  40000-4 0  9995',
            line2: '2 20580  28.4700 150.2300 0002800 290.0000  70.0000 15.09000000 12345',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'NASA',
        country: 'USA',
        launchDate: '1990-04-24',
        purpose: 'Space Telescope',
    },
    {
        id: 'starlink-1007',
        noradId: 44713,
        name: 'STARLINK-1007',
        tle: {
            line1: '1 44713U 19074A   24020.50000000  .00001234  00000-0  80000-4 0  9991',
            line2: '2 44713  53.0000 120.0000 0001500  90.0000 270.0000 15.06000000 23456',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'SpaceX',
        country: 'USA',
        launchDate: '2019-11-11',
        purpose: 'Communications',
    },
    {
        id: 'starlink-1008',
        noradId: 44714,
        name: 'STARLINK-1008',
        tle: {
            line1: '1 44714U 19074B   24020.50000000  .00001234  00000-0  80000-4 0  9992',
            line2: '2 44714  53.0000 122.0000 0001500  92.0000 268.0000 15.06000000 23457',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'SpaceX',
        country: 'USA',
        launchDate: '2019-11-11',
        purpose: 'Communications',
    },
    {
        id: 'starlink-1009',
        noradId: 44715,
        name: 'STARLINK-1009',
        tle: {
            line1: '1 44715U 19074C   24020.50000000  .00001234  00000-0  80000-4 0  9993',
            line2: '2 44715  53.0000 124.0000 0001500  94.0000 266.0000 15.06000000 23458',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'SpaceX',
        country: 'USA',
        launchDate: '2019-11-11',
        purpose: 'Communications',
    },
    {
        id: 'gps-iir-10',
        noradId: 28190,
        name: 'GPS BIIR-10 (PRN 20)',
        tle: {
            line1: '1 28190U 04009A   24020.50000000  .00000010  00000-0  10000-4 0  9994',
            line2: '2 28190  55.0000  60.0000 0080000 250.0000 110.0000  2.00560000 45678',
        },
        orbitType: 'MEO',
        status: 'active',
        operator: 'US Space Force',
        country: 'USA',
        launchDate: '2004-03-20',
        purpose: 'Navigation',
    },
    {
        id: 'gps-iir-11',
        noradId: 28361,
        name: 'GPS BIIR-11 (PRN 28)',
        tle: {
            line1: '1 28361U 04023A   24020.50000000  .00000010  00000-0  10000-4 0  9995',
            line2: '2 28361  55.0000 120.0000 0070000 260.0000 100.0000  2.00560000 45679',
        },
        orbitType: 'MEO',
        status: 'active',
        operator: 'US Space Force',
        country: 'USA',
        launchDate: '2004-06-23',
        purpose: 'Navigation',
    },
    {
        id: 'goes-16',
        noradId: 41866,
        name: 'GOES 16',
        tle: {
            line1: '1 41866U 16071A   24020.50000000  .00000100  00000-0  00000+0 0  9996',
            line2: '2 41866   0.0300  75.0000 0001000  90.0000 270.0000  1.00270000 26789',
        },
        orbitType: 'GEO',
        status: 'active',
        operator: 'NOAA',
        country: 'USA',
        launchDate: '2016-11-19',
        purpose: 'Weather',
    },
    {
        id: 'goes-17',
        noradId: 43226,
        name: 'GOES 17',
        tle: {
            line1: '1 43226U 18022A   24020.50000000  .00000100  00000-0  00000+0 0  9997',
            line2: '2 43226   0.0400 137.0000 0001000 100.0000 260.0000  1.00270000 21234',
        },
        orbitType: 'GEO',
        status: 'active',
        operator: 'NOAA',
        country: 'USA',
        launchDate: '2018-03-01',
        purpose: 'Weather',
    },
    {
        id: 'tiangong',
        noradId: 48274,
        name: 'CSS (TIANHE)',
        tle: {
            line1: '1 48274U 21035A   24020.50000000  .00020000  00000-0  25000-3 0  9998',
            line2: '2 48274  41.5000 200.0000 0006000 300.0000  60.0000 15.60000000 14567',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'CNSA',
        country: 'China',
        launchDate: '2021-04-29',
        purpose: 'Space Station',
    },
    {
        id: 'cosmos-2251-deb-1',
        noradId: 34427,
        name: 'COSMOS 2251 DEB',
        tle: {
            line1: '1 34427U 93036RW  24020.50000000  .00000500  00000-0  10000-3 0  9999',
            line2: '2 34427  74.0000  45.0000 0150000 180.0000 180.0000 14.50000000 56789',
        },
        orbitType: 'LEO',
        status: 'debris',
        operator: 'Russia',
        country: 'Russia',
        purpose: 'Debris',
    },
    {
        id: 'oneweb-0012',
        noradId: 44057,
        name: 'ONEWEB-0012',
        tle: {
            line1: '1 44057U 19010A   24020.50000000  .00000200  00000-0  15000-4 0  9990',
            line2: '2 44057  87.9000  80.0000 0002000 100.0000 260.0000 13.15000000 18234',
        },
        orbitType: 'LEO',
        status: 'active',
        operator: 'OneWeb',
        country: 'UK',
        launchDate: '2019-02-27',
        purpose: 'Communications',
    },
];

// Helper to get satellite by ID
export function getSatelliteById(id: string): Satellite | undefined {
    return mockSatellites.find(s => s.id === id);
}

// Helper to filter satellites
export function filterSatellites(
    satellites: Satellite[],
    options: {
        search?: string;
        orbitTypes?: string[];
        status?: string[];
        operators?: string[];
    }
): Satellite[] {
    return satellites.filter(sat => {
        if (options.search) {
            const search = options.search.toLowerCase();
            if (
                !sat.name.toLowerCase().includes(search) &&
                !sat.noradId.toString().includes(search) &&
                !sat.operator?.toLowerCase().includes(search)
            ) {
                return false;
            }
        }
        if (options.orbitTypes?.length && !options.orbitTypes.includes(sat.orbitType)) {
            return false;
        }
        if (options.status?.length && !options.status.includes(sat.status)) {
            return false;
        }
        if (options.operators?.length && !options.operators.includes(sat.operator || '')) {
            return false;
        }
        return true;
    });
}
