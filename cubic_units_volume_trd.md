# Technical Requirements Document (TRD)
## Cubic Units — Measuring Volume | Grade 5 Math
### Intellia SG | Global Grade 5 Mathematics Curriculum

═══════════════════════════════════════════════════════════════════════════════

## 1. TECHNICAL OVERVIEW

This document specifies the architecture, component design, state management,
data models, simulation logic, gamification implementation, audio pipeline, and
quality standards for the **"Cubic Units — Measuring Volume"** interactive lesson
module within Intellia SG's Grade 5 Math program.

The module is a **React 18 application (Vite + JSX)**, structured identically to
the reference repository **https://github.com/dsamyak/equal**, and styled to match
**https://equal-tau.vercel.app/** pixel-for-pixel in layout rhythm, spacing, and
component shape. It will be embedded/linked from the course index at
`https://intelliasg.com/courses/grade-3-math`-style structure, hosted at:

`https://intelliasg.com/courses/grade-5-math/lessons/cubic-units-volume/`

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API
fallback), directly mirroring the architecture in the uploaded **"Number Bonds
Audio & Narration Pipeline"** document, adapted for this lesson's cube/volume
scripts.

## 2. TECHNOLOGY STACK

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches `equal` repo structure exactly |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind utility classes | Matches existing repo CSS approach |
| Icons | Lucide React | Available in artifact/build environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| 3D Cube Diagrams | Inline SVG + CSS 3D transforms (isometric) | For volume cube-stack diagrams, no WebGL needed |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Randomisation | Vanilla JS (seeded Fisher-Yates + parametric generators) | No library required |
| Math | Vanilla JS | No library required |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

## 3. PROJECT STRUCTURE (mirrors the `equal` repo)

```
cubic-units-volume/
├── public/
│   ├── assets/
│   │   ├── audio/                        # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_story_panel7_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ... (all phase phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                          # React entry point
│   ├── App.jsx                           # Root component, global state (useReducer)
│   ├── App.css                           # Global styles (mirrors equal-tau CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx               # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx                # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx           # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx            # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx         # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx             # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx          # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── CubePackerStation.jsx     # Station A: Drag unit cubes into 3D box
│   │   │   ├── LayerByLayerStation.jsx   # Station B: Build one layer, auto-stack
│   │   │   └── FormulaStation.jsx        # Station C: Fill "V = ___ × ___ × ___ = ___"
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx      # Polymorphic dispatcher → type-specific component
│   │   │   ├── CountCubesQ.jsx           # Q1: Count packed unit cubes → find volume
│   │   │   ├── PictureVolumeQ.jsx        # Q2: Read volume from a 3D diagram
│   │   │   ├── FillVolumeQ.jsx           # Q3: Fill blank — find volume
│   │   │   ├── FillDimensionQ.jsx        # Q4: Fill blank — find missing dimension
│   │   │   ├── BaseAreaQ.jsx             # Q5: Base area × height method
│   │   │   ├── WordProbVolumeQ.jsx       # Q6: Real-world volume word problem
│   │   │   ├── WordProbCompareQ.jsx      # Q7: Compare two volumes
│   │   │   ├── TrueFalseVolumeQ.jsx      # Q8: True/False — is this volume correct?
│   │   │   ├── CompositeSolidQ.jsx       # Q9: Two joined cuboids — total volume
│   │   │   ├── UnitConversionQ.jsx       # Q10: cubic units → cm³/m³ labelling
│   │   │   └── HintOverlay.jsx           # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx             # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx            # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx            # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx         # Fire streak counter
│   │   │   └── WorldMap.jsx              # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx                # LearnFlow robot with mood states
│   │       ├── CubeVolumeDiagram.jsx     # Reusable isometric SVG: l×w×h cube stack
│   │       ├── CubeTray.jsx              # Draggable unit-cube source tray
│   │       ├── GridCell.jsx              # Single layer grid cell (Station B)
│   │       ├── NumberPad.jsx             # Large tap-friendly digit input (0–9)
│   │       └── FeedbackOverlay.jsx       # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js               # 100 question TEMPLATES (all types, parametric)
│   │   └── storyContent.js               # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                   # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js               # Gamification state hook
│   │   └── useLocalStorage.js            # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                   # AUTO-GENERATED: text → .mp3 path map
│       ├── shuffle.js                    # Fisher-Yates randomisation
│       ├── questionGenerator.js          # Procedural parametric question generator
│       ├── scoring.js                    # XP + star calculation + distractor gen
│       └── badgeEngine.js                # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                 # Offline ElevenLabs audio pre-generation
│   └── clean_audio.js                    # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                     # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## 4. APPLICATION STATE ARCHITECTURE

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro', // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0, // 0–6 (7 story panels)
  currentSimStation: 0, // 0=CubePacker, 1=LayerByLayer, 2=Formula
  simStationsComplete: [false, false, false],
  simRound: 0, // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],       // 100 shuffled + freshly-parameterised Question objects
  currentQuestion: 0,    // 0–99
  currentWorld: 0,       // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,       // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],            // Array of unlocked badge IDs
  compositeSolidStreak: 0, // For "Sharp Stacker" badge
  countriesSeen: [],       // For "Global Explorer" badge

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,   // ElevenLabs narration on/off
  musicEnabled: false,  // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;
  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

## 5. QUESTION DATA MODEL

### 5.1 Question Schema

```typescript
interface Question {
  id: string;                 // e.g. "Q1_003", "Q9_008"
  type: QuestionType;         // One of 10 enum values (see below)
  world: number;               // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;       // 1=easy(≤60), 2=medium(≤200), 3=hard(≤500)

  // Core math values
  length: number;
  width: number;
  height: number;
  volume: number;              // length × width × height
  baseArea?: number;           // length × width (for Q5)
  missingSlot: 'length' | 'width' | 'height' | 'volume' | 'baseArea';

  // Rendering
  questionText: string;        // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;          // 'cubeDiagram' | 'picture' | 'formula' | 'trueFalse'
  unit: 'cm' | 'm' | 'in';     // Unit label used for this question

  // MCQ
  options?: (number|string)[]; // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;                // Shown after 1 wrong attempt
  hint2: string;                // Shown after 2 wrong attempts (animation trigger)
  explanation: string;          // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  objectName?: string;          // 'crate', 'fish tank', 'gift box', 'toy box'
  countryContext?: string;      // For "Global Explorer" badge tracking

  // Comparison questions only
  length2?: number; width2?: number; height2?: number; volume2?: number;
  objectName2?: string; characterName2?: string;

  // Composite solid only
  length2c?: number; width2c?: number; height2c?: number; // second block dims

  // True/False only
  isTrue?: boolean;

  // Answer
  correctAnswer: number | string;
}

type QuestionType =
  | 'count_cubes'          // Q1: Count unit cubes packed in a box
  | 'picture_volume'       // Q2: Read volume from a 3D diagram
  | 'fill_volume'          // Q3: l × w × h = ___
  | 'fill_dimension'       // Q4: l × ___ × h = volume
  | 'base_area_method'     // Q5: base area × height = volume
  | 'word_problem_volume'  // Q6: real-world volume-finding word problem
  | 'word_problem_compare' // Q7: compare two volumes
  | 'true_false_volume'    // Q8: Is "l × w × h = X" true or false?
  | 'composite_solid'      // Q9: Two joined cuboids — total volume
  | 'unit_conversion';     // Q10: cubic units → cm³/m³ labelling

type VisualType =
  | 'cubeDiagram'   // Isometric SVG: l×w×h cube stack (CubeVolumeDiagram)
  | 'picture'       // Static 3D cuboid picture card
  | 'formula'       // "___ × ___ × ___ = ___" with highlighted blank
  | 'trueFalse';    // Statement + True/False buttons
```

### 5.2 Sample Question Objects (procedurally generated — values shown are one instance)

```javascript
// Q1 — Count Unit Cubes
{
  id: "Q1_001",
  type: "count_cubes",
  world: 0,
  difficulty: 1,
  length: 4, width: 3, height: 2, volume: 24,
  missingSlot: "volume",
  questionText: "A box is packed with unit cubes: 4 long, 3 wide, and 2 tall. What is its volume?",
  visual: "cubeDiagram",
  unit: "cm",
  hint1: "Count the cubes in one layer first: 4 × 3 = 12.",
  hint2: "There are 2 layers of 12. Count: 12, 24!",
  explanation: "4 × 3 × 2 = 24. The volume is 24 cubic units.",
  options: [20, 22, 24, 26],
  correctAnswer: 24,
}

// Q6 — Real-World Word Problem (Volume-Finding)
{
  id: "Q6_004",
  type: "word_problem_volume",
  world: 3,
  difficulty: 2,
  length: 6, width: 4, height: 3, volume: 72,
  missingSlot: "volume",
  questionText: "John is building a wooden crate that is 6 cm long, 4 cm wide, and 3 cm high. What is its volume?",
  visual: "picture",
  unit: "cm",
  characterName: "John",
  objectName: "wooden crate",
  countryContext: "USA",
  hint1: "Multiply the length and width first: 6 × 4 = 24.",
  hint2: "Now multiply by the height: 24 × 3 = 72!",
  explanation: "6 × 4 × 3 = 72. John's crate has a volume of 72 cubic centimetres.",
  options: [66, 70, 72, 76],
  correctAnswer: 72,
}

// Q7 — Comparison Word Problem
{
  id: "Q7_002",
  type: "word_problem_compare",
  world: 2,
  difficulty: 2,
  length: 4, width: 3, height: 2, volume: 24,
  length2: 3, width2: 3, height2: 3, volume2: 27,
  missingSlot: "volume",
  questionText: "Sofia's fish tank is 4 cm by 3 cm by 2 cm. Amara's gift box is 3 cm by 3 cm by 3 cm. Whose container has the greater volume?",
  visual: "picture",
  unit: "cm",
  characterName: "Sofia", characterName2: "Amara",
  objectName: "fish tank", objectName2: "gift box",
  countryContext: "Brazil",
  hint1: "Find each volume separately first.",
  hint2: "24 cubic units vs 27 cubic units — which is bigger?",
  explanation: "Sofia's tank is 24 cubic units. Amara's box is 27 cubic units. Amara's box has the greater volume.",
  options: ["Sofia's fish tank", "Amara's gift box", "They are equal", "Cannot tell"],
  correctAnswer: "Amara's gift box",
}

// Q9 — Composite Solid
{
  id: "Q9_005",
  type: "composite_solid",
  world: 7,
  difficulty: 3,
  length: 4, width: 3, height: 2, volume: 24,
  length2c: 2, width2c: 2, height2c: 2,
  missingSlot: "volume",
  questionText: "Mike stacks a 2 by 2 by 2 block on top of a 4 by 3 by 2 block. What is the total volume of the whole shape?",
  visual: "cubeDiagram",
  unit: "cm",
  characterName: "Mike",
  hint1: "Find the volume of each block separately: 4×3×2 and 2×2×2.",
  hint2: "24 + 8 = 32! Add both volumes together.",
  explanation: "The first block is 24 cubic units. The second block is 8 cubic units. 24 + 8 = 32 cubic units total.",
  options: [28, 30, 32, 34],
  correctAnswer: 32,
}
```

## 6. CUBE VOLUME DIAGRAM SVG COMPONENT

```javascript
// CubeVolumeDiagram.jsx — reusable isometric SVG for l × w × h unit-cube stacks
const CubeVolumeDiagram = ({
  length,
  width,
  height,
  missingSlot,
  animated = false,
  size = 'medium', // 'small' | 'medium' | 'large'
}) => {
  // Isometric projection: each unit cube drawn as a parallelogram-topped cube
  const cubeSize = size === 'large' ? 26 : size === 'medium' ? 20 : 14;
  const isoX = cubeSize * 0.87;   // horizontal isometric offset
  const isoY = cubeSize * 0.5;    // vertical isometric offset for depth

  const svgWidth = (length + width) * isoX + 60;
  const svgHeight = (length + width) * isoY + height * cubeSize + 80;

  // Layer colours cycle through a fixed palette for visual clarity
  const layerColors = ['#4A90D9', '#3FBF9F', '#F2B84B', '#E0708C', '#8E7CE0'];

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
         xmlns="http://www.w3.org/2000/svg"
         style={{ maxWidth: '100%', height: 'auto' }}>
      {Array(height).fill(0).map((_, layerIndex) => (
        <g key={layerIndex}
           className={animated ? 'layer-stack-in' : ''}
           style={{ animationDelay: `${layerIndex * 180}ms` }}>
          {Array(length).fill(0).map((_, li) =>
            Array(width).fill(0).map((_, wi) => {
              const baseX = svgWidth / 2 + (li - wi) * isoX;
              const baseY = 40 + (li + wi) * isoY - layerIndex * cubeSize;
              const fill = layerColors[layerIndex % layerColors.length];
              return (
                <g key={`${li}-${wi}`}
                   className={animated ? 'cube-pop-in' : ''}
                   style={{ animationDelay: `${(layerIndex * length * width + li * width + wi) * 40}ms` }}>
                  {/* Top face */}
                  <polygon
                    points={`${baseX},${baseY} ${baseX + isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX - isoX},${baseY + isoY}`}
                    fill={fill} stroke="#2c3e50" strokeWidth="0.6" opacity="0.95" />
                  {/* Left face */}
                  <polygon
                    points={`${baseX - isoX},${baseY + isoY} ${baseX},${baseY + isoY * 2} ${baseX},${baseY + isoY * 2 + cubeSize} ${baseX - isoX},${baseY + isoY + cubeSize}`}
                    fill={fill} stroke="#2c3e50" strokeWidth="0.6" opacity="0.75" />
                  {/* Right face */}
                  <polygon
                    points={`${baseX},${baseY + isoY * 2} ${baseX + isoX},${baseY + isoY} ${baseX + isoX},${baseY + isoY + cubeSize} ${baseX},${baseY + isoY * 2 + cubeSize}`}
                    fill={fill} stroke="#2c3e50" strokeWidth="0.6" opacity="0.6" />
                </g>
              );
            })
          )}
        </g>
      ))}
      {/* Formula label underneath */}
      <text x={svgWidth / 2} y={svgHeight - 10}
            textAnchor="middle" fontSize="15" fill="#333" fontWeight="bold">
        {`${missingSlot === 'length' ? '?' : length} × ${missingSlot === 'width' ? '?' : width} × ${missingSlot === 'height' ? '?' : height} = ${missingSlot === 'volume' ? '?' : length * width * height}`}
      </text>
    </svg>
  );
};
```

**Animation variants:**
- `animated=true` → `layer-stack-in` keyframe: each layer rises into place with a
  180ms stagger; `cube-pop-in` keyframe: each cube appears with a 40ms stagger
  within its layer
- `shake` variant → CSS `shake` keyframe applied to `<svg>` wrapper on wrong answer
- `bounceIn` variant → CSS `bounceIn` keyframe applied to `<svg>` wrapper on correct answer

## 7. SIMULATION STATION COMPONENT SPECS

### 7.1 `CubePackerStation.jsx` — Station A (Concrete)

```javascript
const [boxConfig, setBoxConfig] = useState(getStationARound(state.simRound));
// boxConfig: { length: 4, width: 3, height: 2 } → volume 24

const [placedCubes, setPlacedCubes] = useState(
  Array(boxConfig.length * boxConfig.width * boxConfig.height).fill(false)
);
```

**Interaction (Drag):**
- `CubeTray` renders draggable unit-cube `<div>` elements
- The wireframe box renders `length × width × height` droppable grid slots,
  ordered front-to-back, left-to-right, bottom-to-top
- `onDrop`: marks the nearest open slot as filled; live counter updates
  "Cubes placed: 14 / 24"

**Interaction (Tap fallback):**
- Tap a cube in the tray → cube becomes "selected" (glows)
- Tap the next open grid slot → cube snaps into place

**Completion Check:**
- `placedCubes.every(Boolean)` → box is fully and correctly packed
- Submit button appears only when all slots are filled
- On submit correct: mascot celebrates, ElevenLabs plays celebration audio,
  formula strip animates in: "4 × 3 × 2 = 24 cubic units!"
- On submit with any gaps: shake + narration "Not quite full yet — let's check
  for any empty spots!"

**Station A Rounds (4 rounds, randomised order):**
```javascript
[
  { length: 2, width: 2, height: 2 },
  { length: 4, width: 3, height: 2 },
  { length: 5, width: 2, height: 3 },
  { length: 4, width: 4, height: 3 },
]
```

### 7.2 `LayerByLayerStation.jsx` — Station B (Pictorial)

```javascript
const [layerConfig, setLayerConfig] = useState(getStationBRound(state.simRound));
// layerConfig: { length: 4, width: 3, height: 3 }
const [layerCells, setLayerCells] = useState(
  Array(layerConfig.length * layerConfig.width).fill(false)
);
const [stacked, setStacked] = useState(false);
```

**Interaction:**
- Student taps cells in a top-down `length × width` grid to mark them filled
- On `layerCells.every(Boolean)`, "Stack it!" button appears
- Tapping "Stack it!" triggers `setStacked(true)`, animating the completed layer
  copying itself upward `height` times, cube-count ticking up per layer
- Running formula strip updates live: "1 layer = 4 × 3 = 12 cubes → 3 layers =
  3 × 12 = 36 cubes"

**Teaching goal:**
Directly reinforces `V = Base Area × Height` by visually demonstrating that
volume is the repeated stacking of one identical layer.

**3 rounds (increasing complexity):**
```javascript
[
  { length: 3, width: 2, height: 2 },
  { length: 4, width: 3, height: 3 },
  { length: 5, width: 4, height: 4 },
]
```

### 7.3 `FormulaStation.jsx` — Station C (Abstract)

```javascript
const [problem, setProblem] = useState(getFormulaProblem(state.simRound));
// problem: { length, width, height, volume, missingSlot }
const [inputValue, setInputValue] = useState('');
const [showBox, setShowBox] = useState(false);
```

**Layout:**
```jsx
<div class="formula-row">
  {missingSlot === 'length'
    ? <BlankInput value={inputValue} />
    : <span class="given-value">{length}</span>}
  <span class="operator">×</span>
  {missingSlot === 'width'
    ? <BlankInput value={inputValue} />
    : <span class="given-value">{width}</span>}
  <span class="operator">×</span>
  {missingSlot === 'height'
    ? <BlankInput value={inputValue} />
    : <span class="given-value">{height}</span>}
  <span class="equals">=</span>
  {missingSlot === 'volume'
    ? <BlankInput value={inputValue} />
    : <span class="given-value">{volume}</span>}
</div>
<NumberPad max={500} value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
<button onClick={() => setShowBox(!showBox)}>Show me the box 📦</button>
{showBox && <CubeVolumeDiagram length={length} width={width} height={height}
                                 missingSlot={missingSlot} animated />}
```

**Variants (rotated across 3 rounds):**
- Round 1: Find total volume → `5 × 3 × 2 = ___`
- Round 2: Find missing dimension → `4 × ___ × 3 = 48`
- Round 3: Find volume via base area → `Base Area 15 × Height 4 = ___`

ElevenLabs reads the full formula aloud when displayed:
"Five times three times two equals what? Type the answer!"

## 8. AUDIO PIPELINE (ElevenLabs — Matching Reference Architecture)

### 8.1 Voice Configuration
```
Voice Name: Alice
Voice ID: Xb7hH8MSUJpSbSDYk0k2
Model: eleven_multilingual_v2
API Key Var: VITE_ELEVENLABS_API_KEY (in .env.local)
```

### 8.2 Speech Style Settings (per style type — matching reference pipeline)

| Style | stability | similarity_boost | style | use_speaker_boost |
|---|---|---|---|---|
| celebration | 0.12 | 0.45 | 0.75 | true |
| encouragement | 0.16 | 0.50 | 0.65 | true |
| question | 0.20 | 0.55 | 0.55 | true |
| emphasis | 0.16 | 0.50 | 0.60 | true |
| thinking | 0.24 | 0.60 | 0.35 | true |
| statement / instruction | 0.20 | 0.55 | 0.50 | true |

### 8.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "Sarah is packing a toy box. It's four cubes long, three cubes wide, and two cubes tall.", style: 'thinking' },
  { text: "How many little cube blocks can fit inside altogether?", style: 'question' },
  { text: "Let's discover what volume really means!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "John and his friend Mike are building a model shipping crate for the school science fair.", style: 'statement' },
  { text: "The crate is five cubes long, three cubes wide, and two cubes high. Let's fill it with unit cubes and count them!", style: 'statement' },
  { text: "One layer is five times three, which is fifteen cubes.", style: 'statement' },
  { text: "Two layers of fifteen is fifteen plus fifteen, which is thirty unit cubes altogether! That's the crate's volume — thirty cubic units!", style: 'emphasis' },
  { text: "Sofia, visiting from Brazil, shows her fish tank: six cubes long, two cubes wide, three cubes tall.", style: 'statement' },
  { text: "Six times two times three equals thirty-six. Sofia's tank holds thirty-six cubic units of water!", style: 'emphasis' },
  { text: "Yuki and Amara compare two gift boxes to see which one holds more.", style: 'statement' },

  // Phase 3 — Simulation Instructions
  { text: "Drag the unit cubes into the box. Fill it layer by layer!", style: 'instruction' },
  { text: "Make sure every space is filled. Can you do it?", style: 'question' },
  { text: "Fill in one layer correctly, then watch it stack all the way up!", style: 'instruction' },
  { text: "Now fill in the missing number. Five times three times two equals what?", style: 'question' },

  // Phase 4 — Feedback
  { text: "Excellent! You found the volume perfectly!", style: 'celebration' },
  { text: "Not quite — let's look at the cubes again.", style: 'encouragement' },
  { text: "Watch me stack the layers! Can you count with me?", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What a journey today! Can you describe how you would find the volume of your own school bag?", style: 'thinking' },
  { text: "Lesson complete! You are a Volume Master!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are Cube Curious!", style: 'celebration' },
  { text: "Badge unlocked! Box Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Volume Master! You scored over eighty percent!", style: 'celebration' },
];
// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
```

### 8.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
// Step 1: Check audioMap for pre-generated static asset
// Step 2: If not found + API key present → fetch from ElevenLabs dynamically
// Step 3: Cache dynamic result in elevenLabsCache (in-memory Map)
// Step 4: Play via HTML5 Audio API (new Audio(url))
// Step 5: While segment i plays → preload segment i+1 (eager preload)

const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key)
  if (!apiKey) return null; // Silent skip — no fallback
  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available

    // Eager preload next segment
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url); // Resolves on 'ended' event
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 8.5 Audio Cleanup (`scripts/clean_audio.js`)
- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 8.6 Narration Synchronisation Rules (1:1 Parity)
**CRITICAL:** Every on-screen text string that is narrated must match
`narration.js` EXACTLY (same words, same punctuation, same capitalisation).
Any UI text change requires:
1. Update `generate_audio.js` phrases array
2. Re-run: `node scripts/generate_audio.js`
3. Update corresponding text in the React UI component
4. Optionally run: `node scripts/clean_audio.js`

## 9. RANDOMISATION ENGINE

### 9.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(templateBank) {
  const byType = {};
  templateBank.forEach(t => {
    if (!byType[t.type]) byType[t.type] = [];
    byType[t.type].push(t);
  });

  // Pick 10 templates from each type (shuffled), instantiate fresh numeric
  // values for every one, then shuffle the combined 100 into world order.
  const selected = Object.values(byType)
    .flatMap(templates => shuffleArray(templates).slice(0, 10)
      .map(instantiateQuestion));
  return shuffleArray(selected);
}
```

### 9.2 Procedural Question Instantiation (`utils/questionGenerator.js`)

```javascript
const NAMES = ["John","Mike","Sarah","Emma","Liam","Sofia","Yuki","Carlos",
  "Amara","Noah","Priya","Lucas","Fatima","Oliver","Mei","Ahmed","Grace",
  "Diego","Hana","Ethan"];

const OBJECTS = ["toy box","shipping crate","fish tank","gift box","sandbox",
  "storage bin","ice cube tray","aquarium","moving box","wooden block tower"];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function instantiateQuestion(template) {
  const range = DIFFICULTY_RANGES[template.difficulty]; // { min, max }
  const length = randInt(range.min, range.max);
  const width = randInt(range.min, range.max);
  const height = randInt(range.min, range.max);
  const volume = length * width * height;

  return {
    ...template,
    id: `${template.type}_${crypto.randomUUID().slice(0, 8)}`,
    length, width, height, volume,
    baseArea: length * width,
    characterName: NAMES[randInt(0, NAMES.length - 1)],
    objectName: OBJECTS[randInt(0, OBJECTS.length - 1)],
    options: generateDistractors(
      template.missingSlot === 'volume' ? volume : eval(`${template.missingSlot}`),
      1, range.max * range.max * range.max
    ),
    correctAnswer: template.missingSlot === 'volume' ? volume : undefined,
  };
}
```

### 9.3 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generateDistractors(correct, min = 0, max = 500, count = 3) {
  const distractors = new Set();
  // Strategy: offsets based on a plausible wrong-dimension swap
  const offsets = [-6, -4, -2, 2, 4, 6];
  shuffleArray(offsets).forEach(offset => {
    const d = correct + offset;
    if (d >= min && d <= max && d !== correct && distractors.size < count)
      distractors.add(d);
  });
  // Ensure always 4 options
  while (distractors.size < count) {
    const d = correct + (distractors.size + 1) * 2;
    if (d <= max && d !== correct) distractors.add(d);
  }
  return shuffleArray([correct, ...distractors]);
}
```

### 9.4 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_cubic_volume_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

## 10. GAMIFICATION IMPLEMENTATION

### 10.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 10.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0; // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 10.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'cube_curious',
    label: '🏅 Cube Curious',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'box_builder',
    label: '🥈 Box Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'volume_master',
    label: '🥇 Volume Master',
    description: 'Score 80%+ in Play phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_packer',
    label: '💎 Perfect Packer',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_journey',
    label: '🌟 Full Journey',
    description: 'Complete all 6 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_stacker',
    label: '🎯 Sharp Stacker',
    description: 'Get 5 correct composite-solid questions in a row',
    condition: (s) => s.compositeSolidStreak >= 5,
  },
  {
    id: 'global_explorer',
    label: '🌍 Global Explorer',
    description: "Answer word problems featuring 5 different countries' contexts correctly",
    condition: (s) => new Set(s.countriesSeen).size >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([{ text: badge.description, style: 'celebration' }], apiKey);
  });
}
```

## 11. CSS ANIMATION KEYFRAMES (matching equal-tau.vercel.app style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes cubePopIn {
  /* Applied to each unit cube with staggered delay */
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes layerStackIn {
  /* Applied to each layer group with staggered delay */
  0%   { transform: translateY(40px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Stagger: each layer gets animation-delay: (layerIndex * 180ms);
   each cube within a layer gets animation-delay: (cubeIndex * 40ms) */
```

## 12. COMPONENT PROP CONTRACTS

```
CubeVolumeDiagram
  Props: { length, width, height, missingSlot?, animated?, size? }
  Returns: SVG element (inline, responsive, isometric)

CubeTray
  Props: { cubesRemaining, onDragStart, onTap }
  Returns: Flex row of draggable/tappable unit-cube spans

GridCell
  Props: { index, filled, onToggle }
  Returns: Tappable grid cell for Station B layer-fill

NumberPad
  Props: { max, value, onChange, onSubmit }
  Returns: Grid of digit buttons (min 44×44px), backspace, submit

Mascot
  Props: { mood: 'idle'|'happy'|'thinking'|'celebrating'|'encouraging' }
  Returns: img/svg + CSS animation class mapped to mood

QuestionRenderer
  Props: { question: Question, onAnswer: (answer: any) => void, hints: number }
  Returns: Type-specific question component

FeedbackOverlay
  Props: { isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }
  Returns: Animated modal overlay (bounceIn correct / shake wrong)

WorldMap
  Props: { worldScores: (number|null)[], currentWorld: number, onSelectWorld: (i) => void }
  Returns: Horizontal scrollable world list with star ratings and lock icons

BadgePanel
  Props: { badges: string[], newBadgeId?: string }
  Returns: Badge grid with unlock toast animation for newBadgeId
```

## 13. PERFORMANCE REQUIREMENTS

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG/CSS 3D animation frame rate | 60 fps |
| Memory usage | < 70 MB |
| Bundle size (gzipped) | < 650 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0ms (static .mp3 assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency) |

## 14. BROWSER & DEVICE SUPPORT

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad) | Full — primary classroom device |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test device: Desktop Chrome (1280px+) and iPad (768px, touch) —
classroom use context.

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | July 2026
**Product:** Intellia SG — Grade 5 Math, Cubic Units & Volume
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline Reference:** Number Bonds Audio & Narration Pipeline
