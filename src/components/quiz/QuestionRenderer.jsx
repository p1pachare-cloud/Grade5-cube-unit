import React from 'react';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';

export default function QuestionRenderer({ question, selectedOption, onSelectOption, disabled }) {
  const showDiagram = question.visual === 'cubeDiagram' || question.type === 'count_cubes' || question.type === 'composite_solid';

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {showDiagram && (
        <CubeVolumeDiagram
          length={question.length}
          width={question.width}
          height={question.height}
          missingSlot={question.missingSlot}
          size="small"
          showLabel={false}
        />
      )}

      <h3 className="question-text" style={{ fontSize: '1.1rem', margin: '8px 0 10px', textAlign: 'center' }}>{question.questionText}</h3>

      <div className="options-grid" style={{ width: '100%' }}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          return (
            <button
              key={idx}
              type="button"
              className={`option-btn ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onSelectOption(opt)}
            >
              {isSelected && <span>✓</span>}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
