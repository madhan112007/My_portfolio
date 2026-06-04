import React, { useRef, useEffect } from 'react';

const NODES = [
  // AI cluster
  { id: 0, x: 0.22, y: 0.20, label: 'PyTorch',      size: 6, group: 0 },
  { id: 1, x: 0.35, y: 0.14, label: 'TensorFlow',   size: 5, group: 0 },
  { id: 2, x: 0.12, y: 0.32, label: 'YOLOv8',       size: 4, group: 0 },
  { id: 3, x: 0.28, y: 0.35, label: 'OpenCV',        size: 4, group: 0 },
  { id: 4, x: 0.42, y: 0.28, label: 'HuggingFace',  size: 4, group: 0 },
  // Web cluster
  { id: 5, x: 0.65, y: 0.18, label: 'FastAPI',       size: 5, group: 1 },
  { id: 6, x: 0.78, y: 0.28, label: 'React',         size: 5, group: 1 },
  { id: 7, x: 0.72, y: 0.40, label: 'Node.js',       size: 4, group: 1 },
  { id: 8, x: 0.58, y: 0.35, label: 'MongoDB',       size: 4, group: 1 },
  // Cloud
  { id: 9,  x: 0.50, y: 0.60, label: 'AWS',          size: 6, group: 2 },
  { id: 10, x: 0.38, y: 0.70, label: 'Docker',       size: 4, group: 2 },
  { id: 11, x: 0.62, y: 0.72, label: 'PostgreSQL',   size: 4, group: 2 },
  // Robotics
  { id: 12, x: 0.18, y: 0.60, label: 'ESP32',        size: 4, group: 3 },
  { id: 13, x: 0.08, y: 0.72, label: 'Raspberry Pi', size: 4, group: 3 },
  { id: 14, x: 0.28, y: 0.80, label: 'Embedded C',   size: 3, group: 3 },
  // Languages
  { id: 15, x: 0.82, y: 0.62, label: 'Python',       size: 6, group: 4 },
  { id: 16, x: 0.90, y: 0.50, label: 'Java',         size: 4, group: 4 },
  { id: 17, x: 0.88, y: 0.76, label: 'C++',          size: 4, group: 4 },
];

const EDGES = [
  [0,1],[0,2],[0,3],[1,4],[3,4],
  [5,6],[5,7],[6,7],[7,8],[5,8],
  [9,10],[9,11],[10,8],[11,7],
  [12,13],[12,14],[13,14],[12,3],
  [15,16],[15,17],[15,9],[15,5],
  [4,5],[3,9],
];

const GROUP_COLORS = ['#B8860B','#8B1A1A','#1A4B8C','#2A6B2A','#6B2A8C'];

const StarMap = ({ width = 340, height = 280 }) => {
  const nodes = NODES.map(n => ({ ...n, px: n.x * width, py: n.y * height }));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* Grid circles */}
      {[0.25, 0.42, 0.58].map((r, i) => (
        <circle key={i} cx={width/2} cy={height/2} r={r * Math.min(width, height)}
          fill="none" stroke="var(--gold)" strokeWidth="0.4" opacity="0.15"/>
      ))}

      {/* Edges */}
      {EDGES.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].px} y1={nodes[a].py}
          x2={nodes[b].px} y2={nodes[b].py}
          stroke="#B8860B" strokeWidth="0.7" opacity="0.35"/>
      ))}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.px} cy={n.py} r={n.size + 2} fill={GROUP_COLORS[n.group]} opacity="0.15"/>
          <circle cx={n.px} cy={n.py} r={n.size} fill={GROUP_COLORS[n.group]} opacity="0.9"
            stroke="#FFD700" strokeWidth="0.5">
            <animate attributeName="r" values={`${n.size};${n.size+1.5};${n.size}`} dur={`${2 + n.id * 0.3}s`} repeatCount="indefinite"/>
          </circle>
          <text x={n.px} y={n.py - n.size - 3} textAnchor="middle"
            fontFamily="'EB Garamond',serif" fontSize="9" fill="var(--ink)" opacity="0.8">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default StarMap;
