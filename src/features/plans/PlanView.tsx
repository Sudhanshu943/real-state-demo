import { useState } from 'react';
import { PLANS_BY_COLLECTION } from '../../data/planDefinitions';
import type { CollectionId, Aspect, RoomId } from '../../domain/types';

interface PlanViewProps {
  collectionId: CollectionId;
  orientation: Aspect;
  onSelectRoom?: (tourRoomId: RoomId) => void;
  showTourHotspots?: boolean;
}

export function PlanView({
  collectionId,
  orientation,
  onSelectRoom,
  showTourHotspots = true
}: PlanViewProps) {
  const plan = PLANS_BY_COLLECTION[collectionId] || PLANS_BY_COLLECTION.skyline;
  const isEast = orientation === 'east';
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  // SVG Scale factor: 1m = 25px
  const scale = 25;
  const padding = 30;

  const totalWidth = (plan.internalWidth + (collectionId === 'garden' ? 2 : 0)) * scale;
  const totalHeight = (plan.internalDepth + plan.terraceDepth) * scale;

  const svgWidth = totalWidth + padding * 2;
  const svgHeight = totalHeight + padding * 2;

  return (
    <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{
          width: '100%',
          height: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-line)'
        }}
      >
        {/* North Compass Indicator (Always North = Top/Negative Z) */}
        <g transform={`translate(${svgWidth - 40}, 35)`}>
          <circle r="16" fill="none" stroke="#D6D3CA" strokeWidth="1" />
          <path d="M 0 -12 L 4 0 L -4 0 Z" fill="#28463C" />
          <path d="M 0 12 L 4 0 L -4 0 Z" fill="#A8875F" />
          <text y="-14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#28463C">
            N
          </text>
        </g>

        {/* Plan Rooms Group */}
        <g transform={`translate(${padding}, ${padding})`}>
          {plan.rooms.map((room) => {
            // East mirrors X across width
            const rx = isEast ? (plan.internalWidth - (room.x + room.width)) * scale : room.x * scale;
            const rz = room.z * scale;
            const rw = room.width * scale;
            const rh = room.depth * scale;

            const isHovered = hoveredRoom === room.id;
            const hasTour = Boolean(room.tourTarget) && showTourHotspots;

            return (
              <g
                key={room.id}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => {
                  if (hasTour && room.tourTarget && onSelectRoom) {
                    onSelectRoom(room.tourTarget);
                  }
                }}
                style={{ cursor: hasTour ? 'pointer' : 'default' }}
              >
                {/* Room Boundary Box */}
                <rect
                  x={rx}
                  y={rz}
                  width={rw}
                  height={rh}
                  fill={
                    isHovered
                      ? hasTour
                        ? 'rgba(40, 70, 60, 0.12)'
                        : 'rgba(24, 34, 31, 0.05)'
                      : hasTour
                      ? 'rgba(168, 135, 95, 0.08)'
                      : '#FAF8F5'
                  }
                  stroke={isHovered ? '#28463C' : '#C2BEB4'}
                  strokeWidth={isHovered ? '2' : '1'}
                />

                {/* Normal Readable Text Labels (Un-mirrored) */}
                <text
                  x={rx + rw / 2}
                  y={rz + rh / 2 - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={rw < 60 ? '9' : '11'}
                  fontFamily="sans-serif"
                  fontWeight={hasTour ? '600' : '500'}
                  fill={hasTour ? '#28463C' : '#18221F'}
                >
                  {room.name}
                </text>

                {hasTour && (
                  <text
                    x={rx + rw / 2}
                    y={rz + rh / 2 + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fill="#A8875F"
                    fontWeight="600"
                  >
                    View in 3D →
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
