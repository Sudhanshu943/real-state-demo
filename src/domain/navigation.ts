import type { Selection, RoomId } from './types';

export const VALID_FLOORS = [4, 8, 12];
export const VALID_UNIT_IDS = ['A0401', 'A0402', 'A0801', 'A0802', 'A1201', 'A1202'];
export const VALID_ROOM_IDS: RoomId[] = ['living', 'bedroom', 'balcony'];

export interface ParsedRoute {
  selection: Selection;
  normalizedPath: string;
  isInvalid: boolean;
  redirectNotice?: string;
}

export function parseHashRoute(hash: string): ParsedRoute {
  // Strip leading '#' and split query params
  const cleanHash = hash.replace(/^#\/?/, '/');
  const [pathname, queryString] = cleanHash.split('?');
  const searchParams = new URLSearchParams(queryString || '');

  const segments = pathname.split('/').filter(Boolean);

  // 1. Home
  if (segments.length === 0) {
    return {
      selection: { kind: 'building' },
      normalizedPath: '#/',
      isInvalid: false
    };
  }

  // 2. Compare
  if (segments[0] === 'compare') {
    return {
      selection: { kind: 'compare' },
      normalizedPath: '#/compare',
      isInvalid: false
    };
  }

  // 3. Explore
  if (segments[0] === 'explore') {
    const sub = segments[1];

    if (!sub || sub === 'building') {
      return {
        selection: { kind: 'building' },
        normalizedPath: '#/explore/building',
        isInvalid: false
      };
    }

    if (sub === 'district') {
      const landmarkId = searchParams.get('landmark') || undefined;
      return {
        selection: { kind: 'district', landmarkId },
        normalizedPath: `#/explore/district${landmarkId ? `?landmark=${landmarkId}` : ''}`,
        isInvalid: false
      };
    }

    if (sub === 'floors') {
      const floorNum = parseInt(segments[2], 10);
      if (VALID_FLOORS.includes(floorNum)) {
        return {
          selection: { kind: 'floor', floor: floorNum },
          normalizedPath: `#/explore/floors/${floorNum}`,
          isInvalid: false
        };
      }
      return {
        selection: { kind: 'building' },
        normalizedPath: '#/explore/building',
        isInvalid: true,
        redirectNotice: `Level ${segments[2]} is not an interactive floor; showing building overview.`
      };
    }

    if (sub === 'homes') {
      const unitId = segments[2];
      if (!VALID_UNIT_IDS.includes(unitId)) {
        return {
          selection: { kind: 'building' },
          normalizedPath: '#/explore/building',
          isInvalid: true,
          redirectNotice: `Residence ${unitId} not found; showing building overview.`
        };
      }

      // Check for Tour: #/explore/homes/A0801/tour/living
      if (segments[3] === 'tour') {
        const rawRoom = segments[4] as RoomId;
        const validRoom = VALID_ROOM_IDS.includes(rawRoom) ? rawRoom : 'living';
        const isRoomInvalid = !VALID_ROOM_IDS.includes(rawRoom);
        return {
          selection: { kind: 'tour', unitId, roomId: validRoom },
          normalizedPath: `#/explore/homes/${unitId}/tour/${validRoom}`,
          isInvalid: isRoomInvalid,
          redirectNotice: isRoomInvalid ? `Room ${rawRoom} not found; opening living room.` : undefined
        };
      }

      const tab = searchParams.get('tab') === 'plan' ? 'plan' : 'overview';
      return {
        selection: { kind: 'unit', unitId, tab },
        normalizedPath: `#/explore/homes/${unitId}${tab === 'plan' ? '?tab=plan' : ''}`,
        isInvalid: false
      };
    }
  }

  // Fallback to building
  return {
    selection: { kind: 'building' },
    normalizedPath: '#/explore/building',
    isInvalid: true,
    redirectNotice: 'Requested route not found; showing building overview.'
  };
}
