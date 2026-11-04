export type UnitStatus = 'available' | 'reserved' | 'sold';
export type CollectionId = 'garden' | 'skyline' | 'penthouse';
export type RoomId = 'living' | 'bedroom' | 'balcony';
export type Aspect = 'west' | 'east';
export type RenderPreference = 'auto' | 'simplified';
export type PlanOrientation = 'west' | 'east';

export interface Unit {
  id: string;
  buildingId: 'aurel-a';
  floor: number;
  collectionId: CollectionId;
  position: Aspect;
  bedrooms: number;
  internalAreaM2: number;
  terraceAreaM2: number;
  areaDefinition: 'illustrative-internal';
  status: UnitStatus;
  samplePriceINR: number;
  planId: string;
  planOrientation: PlanOrientation;
  sceneNodeId: string;
  tourId: 'skyline-show-residence';
  tourRelationship: 'representative';
  isDemo: true;
}

export interface Collection {
  id: CollectionId;
  name: string;
  bedrooms: number;
  internalAreaM2: number;
  terraceAreaM2: number;
  planId: string;
  thumbnailAssetId: string;
  description: string;
}

export interface Plan {
  id: string;
  collectionId: CollectionId;
  assetId: string;
  schematic: boolean;
  northAxis: 'negative-z';
  roomIds: string[];
  tourRoomMapping: Record<string, RoomId>;
}

export interface TourHotspot {
  targetRoomId: RoomId;
  label: string;
}

export interface TourRoom {
  id: RoomId;
  label: string;
  stillAssetId: string;
  panoramaAssetId?: string;
  cameraNodeId: string;
  hotspots: TourHotspot[];
}

export interface Tour {
  id: 'skyline-show-residence';
  name: string;
  relationship: 'representative';
  disclosure: string;
  defaultRoomId: RoomId;
  rooms: TourRoom[];
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  assetId: string;
}

export interface BuildingData {
  id: 'aurel-a';
  residentialFloors: number;
  exampleFloors: number[];
  widthM: number;
  depthM: number;
  lobbyHeightM: number;
  floorHeightM: number;
  northAxis: 'negative-z';
  fallbackAssetId: string;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  tagline: string;
  isDemo: boolean;
  locationLabel: string;
  currency: string;
  areaUnit: string;
  areaDefinitionLabel: string;
  priceDisclosure: string;
  geographyDisclosure: string;
  heroAssetId: string;
  heroMobileAssetId: string;
}

export interface ProjectSeedData {
  schemaVersion: number;
  project: ProjectMetadata;
  building: BuildingData;
  collections: Collection[];
  units: Unit[];
  plans: Plan[];
  tours: Tour[];
  landmarks: Landmark[];
  amenities: Amenity[];
}

export type Selection =
  | { kind: 'district'; landmarkId?: string }
  | { kind: 'building' }
  | { kind: 'floor'; floor: number }
  | { kind: 'unit'; unitId: string; tab: 'overview' | 'plan' }
  | { kind: 'tour'; unitId: string; roomId: RoomId }
  | { kind: 'compare' };

export interface Filters {
  collection: CollectionId | 'all';
  aspect: Aspect | 'all';
  status: UnitStatus | 'all';
}

export interface Preferences {
  savedIds: string[];
  compareIds: string[];
  renderPreference: RenderPreference;
}

export interface OverlayState {
  kind:
    | 'saved'
    | 'plan'
    | 'replace-compare'
    | 'enquiry'
    | 'about-demo'
    | 'mobile-menu';
  unitId?: string;
  unitIds?: string[];
  candidateId?: string;
}

export interface UiState {
  preferences: Preferences;
  activeOverlay: OverlayState | null;
  notice: string | null;
}
