import React from 'react';

export default function NumberPad({ value = '', onChange, onSubmit, onClear }) {
  const handleDigit = (digit) => {
    if (value.length < 5) {
      onChange(value + digit);
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="number-pad-wrapper" style={{ marginTop: '16px' }}>
      <div className="number-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button key={num} type="button" className="num-pad-btn" onClick={() => handleDigit(String(num))}>
            {num}
          </button>
        ))}
        <button type="button" className="num-pad-btn" onClick={handleBackspace} title="Delete">
          ⌫
        </button>
        <button type="button" className="num-pad-btn" onClick={() => handleDigit('0')}>
          0
        </button>
        <button type="button" className="num-pad-btn" style={{ background: 'rgba(255,193,7,0.2)', borderColor: 'var(--gold)' }} onClick={onSubmit}>
          ✓
        </button>
      </div>
    </div>
  );
}
