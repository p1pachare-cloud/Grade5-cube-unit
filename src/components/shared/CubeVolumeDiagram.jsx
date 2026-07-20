import React from 'react';

export default function CubeVolumeDiagram({
  length = 3,
  width = 2,
  height = 2,
  placedCubes = null,
  missingSlot = null,
  animated = false,
  size = 'medium',
  showLabel = true,
  unit = 'cm',
}) {
  const cubeSize = size === 'large' ? 24 : size === 'medium' ? 18 : 14;
  const isoX = cubeSize * 0.87;
  const isoY = cubeSize * 0.5;

  const topPadding = height * cubeSize + 15;
  const svgWidth = Math.max(260, (length + width) * isoX + 60);
  const svgHeight = topPadding + (length + width) * isoY + 45;

  const layerColors = ['#4A90D9', '#3FBF9F', '#F2B84B', '#E0708C', '#8E7CE0', '#00BCD4'];

  const lengthDisplay = missingSlot === 'length' ? '?' : length;
  const widthDisplay = missingSlot === 'width' ? '?' : width;
  const heightDisplay = missingSlot === 'height' ? '?' : height;
  const volumeDisplay = missingSlot === 'volume' ? '?' : length * width * height;

  const totalCubes = length * width * height;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0', width: '100%' }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: `${svgWidth}px`, height: 'auto', overflow: 'visible' }}
      >
        <defs>
          <filter id="cube-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Wireframe Bounding Box Scaffold Slots */}
        {Array.from({ length: height }).map((_, layerIndex) =>
          Array.from({ length: length }).map((_, li) =>
            Array.from({ length: width }).map((_, wi) => {
              const cubeIndex = layerIndex * (length * width) + li * width + wi;
              const isFilled = placedCubes !== null && placedCubes !== undefined && cubeIndex < placedCubes;

              if (isFilled) return null; // Solid cube will be rendered on top

              const baseX = svgWidth / 2 + (li - wi) * isoX;
              const baseY = topPadding + (li + wi) * isoY - layerIndex * cubeSize;
              const wireStroke = "rgba(255, 215, 64, 0.5)";
              const wireFill = "rgba(255, 193, 7, 0.05)";

              return (
                <g key={`wire-${layerIndex}-${li}-${wi}`}>
                  {/* Top wireframe face */}
                  <polygon
                    points={`${baseX},${baseY} ${baseX + isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX - isoX},${baseY + isoY}`}
                    fill={wireFill}
                    stroke={wireStroke}
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  {/* Left wireframe face */}
                  <polygon
                    points={`${baseX - isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX},${baseY + isoY * 2 + cubeSize} ${baseX - isoX},${baseY + isoY + cubeSize}`}
                    fill="rgba(255, 193, 7, 0.02)"
                    stroke={wireStroke}
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                  {/* Right wireframe face */}
                  <polygon
                    points={`${baseX},${baseY + isoY * 2} ${baseX + isoX},${baseY + isoY} ${baseX + isoX},${baseY + isoY + cubeSize} ${baseX},${baseY + isoY * 2 + cubeSize}`}
                    fill="rgba(255, 193, 7, 0.03)"
                    stroke={wireStroke}
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                </g>
              );
            })
          )
        )}

        {/* Placed Cubes */}
        {Array.from({ length: height }).map((_, layerIndex) => (
          <g key={layerIndex} className={animated ? 'layer-stack-in' : ''} style={{ animationDelay: `${layerIndex * 180}ms` }}>
            {Array.from({ length: length }).map((_, li) =>
              Array.from({ length: width }).map((_, wi) => {
                const cubeIndex = layerIndex * (length * width) + li * width + wi;
                const isVisible = placedCubes === null || placedCubes === undefined || cubeIndex < placedCubes;

                if (!isVisible) return null;

                const baseX = svgWidth / 2 + (li - wi) * isoX;
                const baseY = topPadding + (li + wi) * isoY - layerIndex * cubeSize;
                const fill = layerColors[layerIndex % layerColors.length];

                return (
                  <g key={`${li}-${wi}`} className={animated ? 'cube-pop-in' : ''} style={{ animationDelay: `${(layerIndex * length * width + li * width + wi) * 30}ms` }}>
                    {/* Top face */}
                    <polygon
                      points={`${baseX},${baseY} ${baseX + isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX - isoX},${baseY + isoY}`}
                      fill={fill}
                      stroke="#1a1a2e"
                      strokeWidth="0.8"
                      opacity="0.95"
                    />
                    {/* Left face */}
                    <polygon
                      points={`${baseX - isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX},${baseY + isoY * 2 + cubeSize} ${baseX - isoX},${baseY + isoY + cubeSize}`}
                      fill={fill}
                      stroke="#1a1a2e"
                      strokeWidth="0.8"
                      opacity="0.8"
                    />
                    {/* Right face */}
                    <polygon
                      points={`${baseX},${baseY + isoY * 2} ${baseX + isoX},${baseY + isoY} ${baseX + isoX},${baseY + isoY + cubeSize} ${baseX},${baseY + isoY * 2 + cubeSize}`}
                      fill={fill}
                      stroke="#1a1a2e"
                      strokeWidth="0.8"
                      opacity="0.65"
                    />
                  </g>
                );
              })
            )}
          </g>
        ))}

        {showLabel && (
          <text
            x={svgWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            fontSize="15"
            fill="#ffd54f"
            fontWeight="bold"
            fontFamily="Fredoka, sans-serif"
          >
            {`${lengthDisplay} × ${widthDisplay} × ${heightDisplay} = ${volumeDisplay} cubic units`}
          </text>
        )}
      </svg>
    </div>
  );
}
