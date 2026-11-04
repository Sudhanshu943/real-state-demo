import type { Unit, Filters } from './types';

export function formatPriceINR(amount: number): { compact: string; full: string } {
  const crores = amount / 10000000;
  const compact = `₹${crores.toFixed(2)} Cr`;
  const full = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
  return { compact, full };
}

export function formatArea(m2: number): { metric: string; imperial: string } {
  const sqft = Math.round(m2 * 10.7639);
  return {
    metric: `${m2} m²`,
    imperial: `${sqft} sq ft`
  };
}

export function filterUnits(units: Unit[], filters: Filters, floor?: number): Unit[] {
  return units.filter((unit) => {
    if (floor !== undefined && unit.floor !== floor) {
      return false;
    }
    if (filters.collection !== 'all' && unit.collectionId !== filters.collection) {
      return false;
    }
    if (filters.aspect !== 'all' && unit.position !== filters.aspect) {
      return false;
    }
    if (filters.status !== 'all' && unit.status !== filters.status) {
      return false;
    }
    return true;
  });
}

export function sortUnits(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    // west before east
    if (a.position === 'west' && b.position === 'east') return -1;
    if (a.position === 'east' && b.position === 'west') return 1;
    return a.id.localeCompare(b.id);
  });
}

export function getStatusBadgeText(status: Unit['status']): { label: string; actionLabel: string } {
  switch (status) {
    case 'available':
      return { label: 'Available', actionLabel: 'Request a viewing' };
    case 'reserved':
      return { label: 'Reserved', actionLabel: 'Ask about availability' };
    case 'sold':
      return { label: 'Sold', actionLabel: 'Request similar homes' };
  }
}
