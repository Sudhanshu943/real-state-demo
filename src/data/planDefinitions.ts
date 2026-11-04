export interface PlanRoom {
  id: string;
  name: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  tourTarget?: 'living' | 'bedroom' | 'balcony';
}

export interface PlanDefinition {
  id: string;
  collectionId: 'garden' | 'skyline' | 'penthouse';
  internalWidth: number;
  internalDepth: number;
  terraceDepth: number;
  rooms: PlanRoom[];
}

export const SKYLINE_PLAN: PlanDefinition = {
  id: 'plan-skyline',
  collectionId: 'skyline',
  internalWidth: 12,
  internalDepth: 16,
  terraceDepth: 1,
  rooms: [
    { id: 'living', name: 'Living & Dining', x: 0, z: 10, width: 7, depth: 6, tourTarget: 'living' },
    { id: 'kitchen', name: 'Kitchen', x: 7, z: 10, width: 5, depth: 6 },
    { id: 'primary-bedroom', name: 'Primary Bedroom', x: 0, z: 0, width: 7, depth: 6, tourTarget: 'bedroom' },
    { id: 'bedroom-2', name: 'Bedroom 2', x: 7, z: 0, width: 5, depth: 6 },
    { id: 'bedroom-3', name: 'Study / Bedroom 3', x: 0, z: 6, width: 5, depth: 4 },
    { id: 'bath-1', name: 'Primary Ensuite', x: 7, z: 6, width: 2, depth: 1.5 },
    { id: 'bath-2', name: 'Guest Bath', x: 7, z: 7.5, width: 2, depth: 1.5 },
    { id: 'corridor', name: 'Central Gallery', x: 5, z: 6, width: 2, depth: 4 },
    { id: 'entry', name: 'Private Foyer', x: 9, z: 6, width: 3, depth: 3 },
    { id: 'cross-hall', name: 'Hall', x: 7, z: 9, width: 5, depth: 1 },
    { id: 'balcony', name: 'Garden Loggia', x: 0, z: 16, width: 12, depth: 1, tourTarget: 'balcony' }
  ]
};

export const GARDEN_PLAN: PlanDefinition = {
  id: 'plan-garden',
  collectionId: 'garden',
  internalWidth: 10,
  internalDepth: 16,
  terraceDepth: 2,
  rooms: [
    { id: 'living', name: 'Garden Salon', x: 0, z: 9, width: 6.5, depth: 7 },
    { id: 'kitchen', name: 'Kitchen & Bar', x: 6.5, z: 9, width: 3.5, depth: 7 },
    { id: 'primary-bedroom', name: 'Primary Suite', x: 0, z: 0, width: 5.5, depth: 5.5 },
    { id: 'bedroom-2', name: 'Guest Suite', x: 5.5, z: 0, width: 4.5, depth: 5.5 },
    { id: 'bath-1', name: 'Ensuite', x: 0, z: 5.5, width: 3.5, depth: 3.5 },
    { id: 'bath-2', name: 'Powder Room', x: 3.5, z: 5.5, width: 2.5, depth: 3.5 },
    { id: 'entry', name: 'Vestibule', x: 6, z: 5.5, width: 4, depth: 3.5 },
    { id: 'terrace', name: 'Planted Terrace', x: 0, z: 16, width: 12, depth: 2 }
  ]
};

export const PENTHOUSE_PLAN: PlanDefinition = {
  id: 'plan-penthouse',
  collectionId: 'penthouse',
  internalWidth: 12,
  internalDepth: 16,
  terraceDepth: 3,
  rooms: [
    { id: 'living', name: 'Grand Sky Salon', x: 0, z: 10, width: 7, depth: 6 },
    { id: 'kitchen', name: 'Chef Kitchen', x: 7, z: 10, width: 5, depth: 6 },
    { id: 'primary-bedroom', name: 'Primary Suite', x: 0, z: 0, width: 7, depth: 6 },
    { id: 'bedroom-2', name: 'Terrace Suite', x: 7, z: 0, width: 5, depth: 6 },
    { id: 'bedroom-3', name: 'Library / Retreat', x: 0, z: 6, width: 5, depth: 4 },
    { id: 'bath-1', name: 'Spa Ensuite', x: 7, z: 6, width: 2, depth: 1.5 },
    { id: 'bath-2', name: 'Guest Bath', x: 7, z: 7.5, width: 2, depth: 1.5 },
    { id: 'corridor', name: 'Private Gallery', x: 5, z: 6, width: 2, depth: 4 },
    { id: 'entry', name: 'Grand Foyer', x: 9, z: 6, width: 3, depth: 3 },
    { id: 'cross-hall', name: 'Hall', x: 7, z: 9, width: 5, depth: 1 },
    { id: 'terrace', name: 'Cantilevered Sky Deck', x: 0, z: 16, width: 12, depth: 3 }
  ]
};

export const PLANS_BY_COLLECTION = {
  garden: GARDEN_PLAN,
  skyline: SKYLINE_PLAN,
  penthouse: PENTHOUSE_PLAN
};
