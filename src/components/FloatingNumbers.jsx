import { useMemo } from 'react';

const SYMBOLS = [
  '1 cm³', 'V = l × w × h', '📦', '🧊', 'V = B × h', '24 cm³',
  '30 units³', '5 × 3 × 2', '3D Volume', '60 cm³', '100 m³', '1 unit³'
];

const COLORS = [
  'rgba(255, 215, 64, 0.22)',
  'rgba(0, 229, 255, 0.22)',
  'rgba(179, 136, 255, 0.22)',
  'rgba(105, 240, 174, 0.22)',
  'rgba(255, 128, 171, 0.22)'
];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: `${(i * 5.8 + 2) % 94}%`,
      animationDuration: `${14 + (i % 7) * 3}s`,
      animationDelay: `${(i % 6) * -3.5}s`,
      fontSize: `${1.4 + (i % 4) * 0.4}rem`,
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  return (
    <div className="floating-numbers" aria-hidden="true">
      {items.map(item => (
        <div
          key={item.id}
          className="floating-number"
          style={{
            left: item.left,
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            fontSize: item.fontSize,
            color: item.color,
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
}
