# Product Requirements Document (PRD)
## Cubic Units — Measuring Volume | Grade 5 Math
### Intellia SG | Global Grade 5 Mathematics Curriculum (Common Core / CBSE / Singapore MOE aligned)

═══════════════════════════════════════════════════════════════════════════════

## 1. EXECUTIVE SUMMARY

This document defines the product requirements for the **"Cubic Units — Measuring
Volume"** interactive lesson module, delivered within Intellia SG's **Grade 5 Math**
program. The module targets Grade 5 students aged 10–11 worldwide and introduces
**volume as the amount of space a solid figure occupies**, measured by packing and
counting **unit cubes**, and builds the bridge from the concrete cube-counting model
to the abstract formula **Volume = length × width × height**.

The product is a standalone web application to be hosted at:

`https://intelliasg.com/courses/grade-5-math/lessons/cubic-units-volume/`

(mirroring the course-index pattern already established at
`https://intelliasg.com/courses/grade-3-math`)

It is built using **React (Vite + JSX, JavaScript/CSS)** and is designed to **strictly
mirror** the visual language, layout, and UX structure established at
**https://equal-tau.vercel.app/** and its reference repository
**https://github.com/dsamyak/equal**. Every phase band, top bar, progress tracker,
mascot placement, card styling, button shape, spacing rhythm, and colour system in
this module must resonate one-to-one with that reference build — it is the strict
UI baseline for this lesson, not a loose inspiration.

Audio narration uses **ElevenLabs exclusively**, following the pipeline documented in
the uploaded **"Number Bonds Audio & Narration Pipeline"** reference: voice **Alice**
(Voice ID `Xb7hH8MSUJpSbSDYk0k2`, model `eleven_multilingual_v2`), pre-generated
static `.mp3` files for all fixed phase narration, dynamic ElevenLabs fallback for
practice-question narration, and strict 1:1 text-to-speech parity between on-screen
copy and spoken copy. Only paragraph and question text is ever narrated — titles,
headings, and labels are never read aloud.

The module follows Intellia's 6-stage learner journey (Intro → Wonder → Story →
Simulate → Play → Reflect), and is a **simulation-first, learn-then-practice**
experience: students first explore volume by physically packing 3D cube simulations,
then move into a fully gamified, randomised practice arena.

## 2. PRODUCT VISION & GOALS

### Vision
To make **volume and cubic units** tangible, spatial, and joyful for 10–11 year old
learners everywhere — building genuine 3D spatial reasoning through interactive
cube-packing simulations, a globally-flavoured adventure story, and adaptive
gamified practice, rather than rote memorisation of `l × w × h`.

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 6 phases |
| Practice Engagement | ≥90% attempt at least 15 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥18 minutes per session |
| Curriculum Alignment | 100% aligned to Grade 5 global Volume/Cubic Units standards |
| Phase Progression | ≥80% reach Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Spatial Reasoning Gain | ≥20% improvement on pre/post 3-question spatial check |

## 3. TARGET USERS

### Primary: Grade 5 Students (Age 10–11), Global
- Ready for abstract formulas but need a strong concrete/pictorial anchor first
- Enjoy building, stacking, and manipulating 3D objects — ideal for simulation
- Respond well to a continuing story arc with relatable, globally diverse characters
- Comfortable with light competitive gamification (streaks, XP, leaderboarless badges)

### Secondary: Parents & Teachers
- Assign as classwork, homework, or holiday enrichment
- Expect alignment across major global syllabi (Common Core, CBSE, Singapore MOE,
  UK National Curriculum Y5/Y6, Australian Curriculum)
- Monitor via in-lesson phase-completion indicators (no login required for v1)

## 4. CURRICULUM ALIGNMENT — Grade 5 Volume & Cubic Units (Global)

**Topic:** Cubic Units — Measuring Volume
**Programme:** Intellia SG Grade 5 Math — Measurement & Geometry Strand
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/cubic-units-volume/`
**Course Index Reference (structure to match):** `https://intelliasg.com/courses/grade-3-math`

### Source References
- **Common Core State Standards (US), Grade 5** — `5.MD.C.3`, `5.MD.C.4`, `5.MD.C.5`:
  recognise volume as an attribute of solid figures; measure volume by counting unit
  cubes; relate volume to multiplication and addition; apply `V = l × w × h`.
- **CBSE / NCERT Class 5 Mathematics** — Chapter on "Volume and Capacity": volume as
  space occupied, unit cubes, cubic centimetres, comparing volumes of cuboids.
- **Singapore MOE Primary 5 Mathematics Syllabus** — Measurement strand: volume of
  cubes and cuboids, formula-based problems, litres/cm³ conversion.
- **UK National Curriculum, Year 5/6 Mathematics** — Measurement: estimate volume,
  use standard units (cm³, m³), calculate volume of cuboids.
- **Australian Curriculum, Year 5 Mathematics (ACMMG111)** — Estimate, measure, and
  compare volumes and capacities using litres and millilitres, and cubic units.

### Learning Objectives Covered
| Code | Objective |
|---|---|
| LO1 | Recognise volume as the amount of space a solid figure occupies |
| LO2 | Understand a unit cube (1 cm × 1 cm × 1 cm) as the standard unit of volume |
| LO3 | Find the volume of a rectangular prism by packing it with unit cubes and counting |
| LO4 | Connect cube-counting to repeated addition and multiplication (layers × cubes per layer) |
| LO5 | Apply the formula Volume = length × width × height (V = l × w × h) |
| LO6 | Apply Volume = Base Area × Height (V = B × h) as an alternate formula |
| LO7 | Solve real-world and mathematical word problems involving volume of cuboids |
| LO8 | Compare volumes of two or more rectangular prisms |
| LO9 | Find volume of composite (irregular) solids made of two rectangular prisms |
| LO10 | Use correct units: cubic centimetres (cm³), cubic metres (m³), cubic inches (in³) |

### CPA Progression for This Lesson
- **Concrete** → Digitally simulated unit cubes physically packed into a 3D box
- **Pictorial** → Isometric/3D diagrams of cuboids with visible layered cube grids
- **Abstract** → `V = l × w × h` and `V = B × h` numeric formula problems

### Number Ranges
- **Easy:** Dimensions 1–5 units per side; volume ≤ 60 cubic units
- **Medium:** Dimensions 2–8 units per side; volume ≤ 200 cubic units
- **Hard:** Dimensions 3–12 units per side; volume ≤ 500 cubic units; includes
  reverse-find (missing dimension) and composite-solid problems

### Vocabulary Focus
"volume", "cubic unit", "unit cube", "length", "width", "height", "base area",
"layer", "cuboid / rectangular prism", "cubic centimetre (cm³)", "cubic metre (m³)",
"composite solid", "capacity"

## 5. THE 6-PHASE LEARNER JOURNEY (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)                │
│ Welcome: "Hello, Explorer! Today we're measuring VOLUME with cubic units!"  │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                  │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈ 1–2 min)                                                │
│                                                                              │
│ Hook: "Sarah is packing a toy box. It's 4 cubes long, 3 cubes wide, and     │
│ 2 cubes tall. How many little cube blocks can fit inside altogether?"       │
│                                                                              │
│ Visual: Animated empty box slowly filling with glowing unit cubes           │
│ Animation: Cubes drop in one layer at a time, counter ticking up            │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                   │
│ → Mascot (LearnFlow robot) appears with a curious expression                │
│ → "Let's discover what VOLUME really means!"                                │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈ 3–4 min) — "The Around-the-World Cube Expedition"        │
│                                                                              │
│ Panel 1: John and his friend Mike are building a model shipping crate      │
│          for the school science fair. 📦                                   │
│ Panel 2: "The crate is 5 cubes long, 3 cubes wide, and 2 cubes high.        │
│          Let's fill it with unit cubes and count them!"                    │
│ Panel 3: 3D diagram fills layer by layer — first layer: 5×3 = 15 cubes.     │
│ Panel 4: "Two layers of 15 is 15 + 15 = 30 unit cubes altogether! That's    │
│          the crate's VOLUME — 30 cubic units!"                             │
│ Panel 5: Sofia, visiting from Brazil, shows her fish tank: 6 cubes long,    │
│          2 cubes wide, 3 cubes tall.                                       │
│ Panel 6: "6 × 2 × 3 = 36. Sofia's tank holds 36 cubic units of water!"      │
│ Panel 7: Yuki and Amara compare two gift boxes to see which holds more —    │
│          introducing volume comparison.                                    │
│                                                                              │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration        │
│ → Key vocabulary highlighted: "volume", "unit cube", "layer", "altogether"  │
│ → 3D cube-stack diagram introduced and reused across all later phases      │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈ 7–9 min)                                              │
│                                                                              │
│ 3 Interactive Stations — student must complete all 3 to advance             │
│                                                                              │
│ Station A — "The Cube Packer" (Concrete)                                    │
│ Drag/tap unit cubes to fill a wireframe box, layer by layer.                │
│ Live counter shows cubes placed vs. cubes needed.                          │
│                                                                              │
│ Station B — "Layer by Layer" (Pictorial)                                    │
│ Given a box's length & width, student builds ONE layer correctly, then      │
│ the app auto-stacks it to the given height — reinforcing V = B × h.        │
│                                                                              │
│ Station C — "Build the Formula" (Abstract)                                  │
│ "Volume = ___ × ___ × ___ = ___" — fill blanks using a number pad, with a   │
│ live-rotating 3D box as a scaffold, always available on tap.               │
│                                                                              │
│ → Mascot reacts to each completed station                                  │
│ → ElevenLabs narrates each station instruction and feedback                 │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈ 8–10 min)                                                 │
│                                                                              │
│ IntelliPlay™ Level: 100 fully-randomised questions across 10 worlds         │
│ 10 questions per world, world unlocks at ≥6/10 correct                     │
│ Every question re-randomises its numbers on every attempt/session          │
│ Stars (1–3), XP, badges, and streak fire counter active                    │
│ → Mastery gates the world map; encouragement-first feedback                │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈ 1–2 min)                                               │
│                                                                              │
│ Journal prompt: "Can you describe how you would find the volume of your    │
│ own school bag using cubic units?"                                        │
│ Or: LearnFlow AI chat — type/speak your understanding                     │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.          │
│ → "Share with your teacher!" button (screenshot / export)                 │
└────────────────────────────────────────────────────────────────────────────┘
```

## 6. PHASE 3 — SIMULATION DESIGN (Detailed)

### 6.1 Station A — The Cube Packer (Concrete)

**Visual:**
- A large 3D wireframe box (rendered via layered isometric SVG/CSS 3D transforms)
  with dimensions announced above it: "Fill this box: 4 long, 3 wide, 2 tall"
- A tray of glowing unit cubes below, draggable into the wireframe
- Live counter: "Cubes placed: 14 / 24"

**Interaction:**
- Student drags cubes one at a time into the wireframe, which visually snaps them
  into the correct grid position, filling layer by layer, front-to-back
- OR taps a cube + taps the next open grid slot (accessibility/tap mode)
- A running formula strip below updates: "1 layer = 4 × 3 = 12 cubes"

**Feedback:**
- Box completely and correctly filled → mascot cheers, "You packed it perfectly!
  That's a volume of 24 cubic units!" 🎉
- Student tries to over-place or leaves gaps on submit → gentle shake +
  "Not quite full yet — let's check for any empty spots!"

**Variants per round (randomised, 4 rounds):**
- Round 1: 2 × 2 × 2 (8 unit cubes)
- Round 2: 4 × 3 × 2 (24 unit cubes)
- Round 3: 5 × 2 × 3 (30 unit cubes)
- Round 4: 4 × 4 × 3 (48 unit cubes)

### 6.2 Station B — Layer by Layer (Pictorial)

**Visual:**
- A flat grid representing ONE layer of the box (length × width), shown from a
  top-down pictorial view
- Height value shown separately: "This box is 3 layers tall"

**Interaction:**
- Student fills the single layer grid correctly (taps cells to mark filled)
- On correct layer, app auto-animates stacking that same layer upward the given
  number of times, cube-count ticking up each time
- Diagram displays: "1 layer = (l × w) cubes → 3 layers = 3 × (l × w) cubes"

**Teaching goal:**
- Directly reinforces `V = Base Area × Height` as an equivalent path to
  `V = l × w × h`, and shows *why* multiplying by height works (repeated layers)

**3 rounds with increasing complexity:**
- Round 1: 3×2 layer, 2 layers tall (easy)
- Round 2: 4×3 layer, 3 layers tall (medium)
- Round 3: 5×4 layer, 4 layers tall (hard)

### 6.3 Station C — Build the Formula (Abstract)

**Visual:**
```
Volume = ___ × ___ × ___ = ___
```
(one or two blanks highlighted for input; remaining values visible; a small
rotating 3D box scaffold shown above, toggle-able)

**Interaction:**
- Number pad (large, tap-friendly, 0–9)
- "Show me the box" toggle reveals the rotating 3D cuboid with dimensions labelled
- On submit: correct → bounce animation; incorrect → shake + hint

**Variants (rotated per round):**
- Find total volume: `5 × 3 × 2 = ___`
- Find missing dimension: `4 × ___ × 3 = 48`
- Find volume via base area: `Base Area 15 × Height 4 = ___`

ElevenLabs narrates each formula aloud when displayed.

## 7. PHASE 4 — QUESTION BANK (100 Fully Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total, every value randomised)

| Type | Description | Example |
|---|---|---|
| Q1 | Count unit cubes in a packed box → find volume | A box is packed with unit cubes: 4 long, 3 wide, 2 tall. What is its volume? |
| Q2 | Identify volume from a 3D cube-diagram (visual) | [3D diagram] What is the volume of this shape? |
| Q3 | Fill blank — find volume (formula) | Volume = 5 × 4 × 3 = ___ |
| Q4 | Fill blank — find missing dimension | 6 × ___ × 2 = 60 |
| Q5 | Base-area method | Base area = 12 cm², height = 5 cm. Find the volume. |
| Q6 | Real-world word problem (packing/building) | John is building a wooden crate 6 cm long, 4 cm wide, and 3 cm high. What is its volume? |
| Q7 | Real-world word problem (comparison) | Box A is 4×3×2. Box B is 3×3×3. Which box has the greater volume? |
| Q8 | True or False — is this volume correct? | "A box 5 long, 2 wide, 4 tall has a volume of 40 cubic units." True or False? |
| Q9 | Composite solid (two joined cuboids) | A shape is made of a 4×3×2 block and a 2×2×2 block on top. What is the total volume? |
| Q10 | Unit conversion / labelling | A cube-packed box has a volume of 27 cubic units, each cube 1 cm³. What is the volume in cm³? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy (≤60) | Medium (≤200) | Hard (≤500) |
|---|---|---|---|---|
| Q1 | 10 | 5 | 3 | 2 |
| Q2 | 10 | 5 | 3 | 2 |
| Q3 | 10 | 4 | 4 | 2 |
| Q4 | 10 | 3 | 4 | 3 |
| Q5 | 10 | 3 | 4 | 3 |
| Q6 | 10 | 3 | 4 | 3 |
| Q7 | 10 | 3 | 4 | 3 |
| Q8 | 10 | 5 | 3 | 2 |
| Q9 | 10 | 2 | 4 | 4 |
| Q10 | 10 | 5 | 3 | 2 |
| **TOTAL** | **100** | **38** | **36** | **26** |

### 7.3 Randomisation Requirement
Every question's numeric parameters (length, width, height, base area, object
context, character name, and MCQ distractors) are **regenerated procedurally on
every question render** using seeded random ranges appropriate to its difficulty
tier — no two students, and no two attempts by the same student, see identical
number sets. Only the underlying pedagogical *pattern* per type is fixed; the
values are never hardcoded/static.

### 7.4 Global Context Names & Objects Used in Word Problems
**Names (globally diverse):** John, Mike, Sarah, Emma, Liam, Sofia, Yuki, Carlos,
Amara, Noah, Priya, Lucas, Fatima, Oliver, Mei, Ahmed, Grace, Diego, Hana, Ethan

**Objects:** toy box, shipping crate, fish tank, gift box, sandbox, storage bin,
brick pile, ice cube tray, aquarium, moving box, wooden block tower, sugar cube
stack, water tank, cereal box, book box

**Contexts:** school science fair, home garage, moving day, classroom art project,
community garden, toy store, birthday party, family road trip packing

### 7.5 Global-Syllabus-Aligned Language Requirements
All questions use vocabulary consistent across Common Core, CBSE, Singapore MOE,
and UK/Australian curricula:
- "volume", "cubic unit(s)", "unit cube", "length", "width", "height", "base area"
- "cuboid" / "rectangular prism" (both terms taught interchangeably, with a note)
- "cubic centimetre (cm³)", "cubic metre (m³)"
- "layer", "stack", "composite solid", "altogether"

## 8. GAMIFICATION DESIGN

### 8.1 Reward System
- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)
- 🏅 **"Cube Curious"** — Complete Wonder + Story phases
- 🥈 **"Box Builder"** — Complete all 3 Simulation stations
- 🥇 **"Volume Master"** — Score ≥80% on Play phase (≥80 questions correct)
- 💎 **"Perfect Packer"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌟 **"Full Journey"** — Complete all 6 phases (lesson complete badge)
- 🎯 **"Sharp Stacker"** — Get 5 correct composite-solid (Q9) questions in a row
- 🌍 **"Global Explorer"** — Answer word problems featuring 5 different countries' contexts correctly

### 8.3 Feedback Mechanics

✅ **Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Excellent! You found the volume perfectly!"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

❌ **Incorrect (Attempt 1):**
- Gentle shake animation + ElevenLabs: "Not quite — let's look at the cubes again."
- Hint 1 activates: 3D box diagram highlighted with dimension labels shown

❌ **Incorrect (Attempt 2):**
- Stronger shake + Hint 2: layer-by-layer counting animation plays
- ElevenLabs: "Watch me stack the layers! Can you count with me?"

❌ **Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot explains fully)
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)
| World | Theme | Questions | Difficulty |
|---|---|---|---|
| 1 | "Toy Box Town" | Q1–10 | Easy, dimensions 1–3 |
| 2 | "Crate Kingdom" | Q11–20 | Easy–Med, dimensions 2–4 |
| 3 | "Aquarium Alley" | Q21–30 | Medium, dimensions 2–5 |
| 4 | "Gift Box Grove" | Q31–40 | Medium, dimensions 3–6 |
| 5 | "Sandbox Summit" | Q41–50 | Medium-Hard, dimensions 3–7 |
| 6 | "Storage Station" | Q51–60 | Hard, dimensions 4–8, includes reverse |
| 7 | "Brick Bay" | Q61–70 | Hard, word problems |
| 8 | "Tower Terrace" | Q71–80 | Hard, composite solids |
| 9 | "Global Cargo Port" | Q81–90 | Hard, mixed types, world word-problems |
| 10 | "Volume Vault" | Q91–100 | Hardest, all types mixed, composite + reverse |

Unlock gate: ≥6/10 correct (1-star minimum) required to advance to next world.
3 stars in a world unlocks a hidden "Bonus Challenge" (3 extra questions).

### 8.5 Mascot (LearnFlow AI Companion)
Character: Friendly robot — "LearnFlow" (matching Intellia branding)
Mood States: idle | curious | happy | thinking | celebrating | encouraging
Appearances: Wonder hook, Story narration, Simulation feedback, Reflect phase
Audio: All mascot speech via ElevenLabs Alice voice (pre-generated .mp3)

## 9. AUDIO & NARRATION DESIGN
*(Adapted directly from the reference "Number Bonds Audio & Narration Pipeline")*

### 9.1 Voice Profile & Settings
- **Voice Provider:** ElevenLabs
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Env Var:** `VITE_ELEVENLABS_API_KEY`

### 9.2 Voice Settings by Style

| Style | Stability | Similarity Boost | Style | Speaker Boost |
|---|---|---|---|---|
| celebration | 0.12 | 0.45 | 0.75 | ✅ |
| encouragement | 0.16 | 0.50 | 0.65 | ✅ |
| question | 0.20 | 0.55 | 0.55 | ✅ |
| emphasis | 0.16 | 0.50 | 0.60 | ✅ |
| thinking | 0.24 | 0.60 | 0.35 | ✅ |
| statement / instruction | 0.20 | 0.55 | 0.50 | ✅ |

### 9.3 Content Policy — Paragraphs & Questions ONLY
> Audio is generated **only** for paragraph text and questions. Titles, headings,
> and section labels are **never** narrated, preventing repetitive title-reading
> and keeping narration focused on the educational content.

### 9.4 Pipeline Components (matching the reference pipeline exactly)
- **A. Offline Generation (`scripts/generate_audio.js`)** — reads a `phrases` array
  of exact `text` + `style`, applies per-style ElevenLabs voice settings, hits the
  ElevenLabs TTS API, saves `.mp3` to `public/assets/audio/`, and auto-writes
  `src/utils/audioMap.js`. Rate-limited at 500ms between calls.
- **B. Audio Mapping (`src/utils/audioMap.js`)** — auto-generated dictionary,
  exact text string → relative `.mp3` path, used for exact-match static lookup.
- **C. Audio Cleanup (`scripts/clean_audio.js`)** — deletes orphaned `.mp3` files
  no longer referenced in `audioMap.js`.
- **D. Audio Engine (`src/utils/audio.js`)** — `say()`, `ask()`, `cheer()`,
  `emphasize()`, `think()`, `celebrate()`, `instruct()` segment helpers;
  `getAudioUrl()` cache-first lookup; dynamic ElevenLabs fallback; `narrate()`
  queue manager with `currentQueue` symbol to prevent overlap; `stopNarration()`;
  eager preloading of segment i+1 while segment i plays.
- **E. Narration Scripts (`src/utils/narration.js`)** — phase-specific functions:
  `introNarration()`, `wonderNarration()`, `getStoryNarration()`,
  `simulateStation*Intro()`, `reflectQuestionNarration()`, etc. Only paragraph and
  question text — never titles. Ensures strict 1:1 parity with on-screen text.

### 9.5 Narration Script Examples
**Phase 1 (Wonder) — style: thinking**
"Sarah is packing a toy box. It's four cubes long, three cubes wide, and two cubes tall."
"How many little cube blocks can fit inside altogether?"
"Let's discover what volume really means!"

**Phase 2 (Story, Panel 2) — style: statement**
"The crate is five cubes long, three cubes wide, and two cubes high."
"Let's fill it with unit cubes and count them!"

**Phase 3 (Station A) — style: instruction**
"Drag the unit cubes into the box. Fill it layer by layer!"
"Make sure every space is filled. Can you do it?"

**Phase 4 (Correct feedback) — style: celebration**
"Excellent! You found the volume perfectly!"

**Phase 5 (Reflect) — style: thinking**
"What a journey today! Can you describe how you would find the volume of your own school bag?"

### 9.6 Workflow: Updating or Adding Narration
1. Add exact text + style to `phrases` array in `scripts/generate_audio.js`
2. Run `node scripts/generate_audio.js` to generate `.mp3` and update `audioMap.js`
3. Run `node scripts/clean_audio.js` to remove orphaned files (optional)
4. Add the identical text string to the matching phase function in `narration.js`
5. Wire the component with `narrate(myPhaseNarration(), true)` inside a `useEffect`

## 10. UX & VISUAL DESIGN REQUIREMENTS

### 10.1 Visual Theme
- **Brand:** Intellia SG — Think. Explore. Become.
- **Reference UI (strict, non-negotiable):** `https://equal-tau.vercel.app/`
- **Reference Repo:** `https://github.com/dsamyak/equal`
- **Course index parity target:** `https://intelliasg.com/courses/grade-3-math`
- **Colours:** Match `equal-tau.vercel.app` exactly — primary blue, accent
  gold/yellow for rewards and stars, soft coral/red for wrong-answer shake states,
  white card backgrounds with soft drop shadows, distinct phase-band colours per
  phase (matching Intellia's journey infographic)
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Clean, globally-inclusive character art (no single-country
  stereotype visuals); crate/box/cube iconography as the primary visual motif
- **Cube Diagrams:** Isometric 3D-style unit-cube grids (SVG/CSS 3D transforms),
  colour-differentiated by layer

### 10.2 Layout Structure (mirrors equal-tau.vercel.app exactly)
- **Top Bar:** Intellia logo | Lesson title "Cubic Units — Measuring Volume" |
  6-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 3D Cube-Volume Diagram (Primary Visual Component)
Used throughout all phases. Visual spec:
- Isometric wireframe box rendered with visible unit-cube subdivisions
- Layers colour-coded distinctly (e.g., layer 1 blue, layer 2 teal, layer 3 gold)
- Connecting label underneath: "4 × 3 × 2 = 24 cubic units"
- Cubes animate in (layer-by-layer count-up animation) when diagram first renders
- Missing dimension shown as a dashed-edge face with "?" label

### 10.4 Accessibility
- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design
- Primary: Desktop browser (1024px+) and iPad/tablet (768px+) — classroom context
- Secondary: Mobile (375px+) — stacked single-column layout

## 11. CONTENT REQUIREMENTS

### 11.1 Simulation Visuals
- 3D cube diagrams: isometric SVG-rendered wireframe boxes with unit-cube subdivisions
- Cube tray objects: uniform glowing unit cubes (colour rotates per session theme)
- Station B layer grids: clean top-down grid cells, tap-to-fill
- Abstract formula strip: large bold typography, highlighted blank per round

### 11.2 Question Bank Coverage
- All 10 question types × 10 base patterns = 100 unique question **templates** in
  `questionBank.js`, each template procedurally generating fresh numeric values,
  names, and objects on every render
- Questions randomised per session using Fisher-Yates shuffle at the world level,
  with fresh parameter generation at the question level
- No two sessions present identical question order or identical numbers
- MCQ distractors always plausible (within ±1 layer's worth or a logical
  wrong-dimension swap)

### 11.3 Word Problem Format (Global style)
**Volume-finding sense:**
"[Name] is building a [object] that is [length] cm long, [width] cm wide, and
[height] cm high. What is its volume?"

**Comparison sense:**
"[Name1]'s [object1] is [l1]×[w1]×[h1]. [Name2]'s [object2] is [l2]×[w2]×[h2].
Whose [object] has the greater volume?"

**Composite-solid sense (extended):**
"[Name] stacks a [l1]×[w1]×[h1] block on top of a [l2]×[w2]×[h2] block. What is
the total volume of the whole shape?"

### 11.4 Audio Script Parity (1:1 Strict Parity Rule)
Every on-screen text string that is narrated must match the narration.js text
exactly — same words, same punctuation. Any UI text change requires updating both
the `generate_audio.js` phrases array and the `narration.js` file.

## 12. SUCCESS CRITERIA (v1.0)

| Criterion | Target |
|---|---|
| All 100 question templates randomise correctly, every attempt | ✅ Required |
| All 3 simulation stations functional (drag + tap fallback) | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional per reference pipeline | ✅ Required |
| Mobile/tablet/desktop responsive layout | ✅ Required |
| Grade 5 global Volume/Cubic Units syllabus 100% covered | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI strictly matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at intelliasg.com lesson URL | ✅ Required |

## 13. OUT OF SCOPE (v1.0)
- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Surface area or capacity-in-litres lessons (separate future modules)
- Assessment against full curriculum (broader test engine)

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | July 2026
**Product:** Intellia SG — Grade 5 Math, Cubic Units & Volume
**Lesson Title:** Cubic Units — Measuring Volume
**Curriculum:** Global Grade 5 Mathematics (Common Core, CBSE, Singapore MOE, UK & AU aligned)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline Reference:** Number Bonds Audio & Narration Pipeline (ElevenLabs, Alice, Xb7hH8MSUJpSbSDYk0k2, eleven_multilingual_v2)
**Parent Course Page (structure reference):** https://intelliasg.com/courses/grade-3-math
**Lesson URL:** https://intelliasg.com/courses/grade-5-math/lessons/cubic-units-volume/
