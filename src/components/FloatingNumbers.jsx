import { useMemo } from 'react';

const SYMBOLS = ['1 cm³', 'V=l×w×h', '📦', '🧊', 'V=B×h', 'cm³', 'm³', '3D'];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: `${(i * 7 + 3) % 95}%`,
      animationDuration: `${16 + (i % 6) * 3}s`,
      animationDelay: `${(i % 5) * -4}s`,
      fontSize: `${1.8 + (i % 3) * 0.6}rem`,
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
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
}
