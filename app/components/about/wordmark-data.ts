import type { CollageImage, StaticImage } from "./types";

/**
 * The large invisible canvas behind the SVG mask.
 * It is deliberately bigger than the visible area so slow drift
 * never reveals a hard edge.
 */
export const COLLAGE_VIEWPORT = {
  width: 900,
  height: 620,
} as const;

// ---------------------------------------------------------------------------
// SMJ — Living Human Stories
// Organic, multi-keyframe drift so motion never feels mechanical.
// ---------------------------------------------------------------------------
export const SMJ_IMAGES: CollageImage[] = [
  {
    id: "smj-1",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&q=85",
    alt: "Delegates sharing a moment",
    initialX: -20,
    initialY: -20,
    width: 310,
    height: 230,
    motionConfig: { x: [0, 18, -12, 6, 0], y: [0, -10, 15, -5, 0], duration: 38 },
  },
  {
    id: "smj-2",
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=480&q=85",
    alt: "Students collaborating",
    initialX: 280,
    initialY: -15,
    width: 290,
    height: 220,
    motionConfig: { x: [0, -16, 10, -8, 0], y: [0, 12, -8, 4, 0], duration: 42 },
  },
  {
    id: "smj-3",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=85",
    alt: "Workshop session",
    initialX: 555,
    initialY: -10,
    width: 320,
    height: 225,
    motionConfig: { x: [0, 14, -18, 8, 0], scale: [1, 1.04, 0.98, 1.02, 1], duration: 35 },
  },
  {
    id: "smj-4",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=480&q=85",
    alt: "Friendships and learning",
    initialX: -15,
    initialY: 200,
    width: 295,
    height: 235,
    motionConfig: { y: [0, -18, 12, -6, 0], x: [0, 8, -14, 5, 0], duration: 44 },
  },
  {
    id: "smj-5",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&q=85",
    alt: "Delegate smiling",
    initialX: 270,
    initialY: 195,
    width: 300,
    height: 230,
    motionConfig: {
      x: [0, -10, 16, -6, 0],
      y: [0, 10, -14, 4, 0],
      scale: [1, 1.03, 0.97, 1.02, 1],
      duration: 40,
    },
  },
  {
    id: "smj-6",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=480&q=85",
    alt: "Volunteers at event",
    initialX: 555,
    initialY: 205,
    width: 315,
    height: 225,
    motionConfig: { y: [0, 16, -10, 6, 0], x: [0, -12, 8, -4, 0], duration: 36 },
  },
  {
    id: "smj-7",
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=480&q=85",
    alt: "Students at conference",
    initialX: -10,
    initialY: 415,
    width: 305,
    height: 225,
    motionConfig: { x: [0, -15, 20, -8, 0], scale: [1, 1.02, 0.99, 1.03, 1], duration: 46 },
  },
  {
    id: "smj-8",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=480&q=85",
    alt: "Learning moments",
    initialX: 280,
    initialY: 410,
    width: 290,
    height: 230,
    motionConfig: { y: [0, -12, 18, -8, 0], x: [0, 14, -10, 6, 0], duration: 33 },
  },
  {
    id: "smj-9",
    src: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=480&q=85",
    alt: "Group interaction",
    initialX: 555,
    initialY: 405,
    width: 310,
    height: 225,
    motionConfig: { x: [0, 20, -15, 8, 0], y: [0, -8, 12, -5, 0], duration: 39 },
  },
];

// ---------------------------------------------------------------------------
// MUN — Enduring Institution
// Static — no motion. Conference / formal imagery.
// ---------------------------------------------------------------------------
export const MUN_IMAGES: StaticImage[] = [
  {
    id: "mun-1",
    src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=480&q=85",
    alt: "Committee session",
    x: -10,
    y: -10,
    width: 300,
    height: 220,
  },
  {
    id: "mun-2",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=480&q=85",
    alt: "Formal debate",
    x: 280,
    y: -10,
    width: 310,
    height: 220,
  },
  {
    id: "mun-3",
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=480&q=85",
    alt: "Conference room",
    x: 575,
    y: -10,
    width: 295,
    height: 220,
  },
  {
    id: "mun-4",
    src: "https://images.unsplash.com/photo-1551818255-e6e10579a0ab?w=480&q=85",
    alt: "Placard and speech",
    x: -10,
    y: 200,
    width: 290,
    height: 225,
  },
  {
    id: "mun-5",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&q=85",
    alt: "Keynote speech",
    x: 270,
    y: 200,
    width: 315,
    height: 225,
  },
  {
    id: "mun-6",
    src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=480&q=85",
    alt: "Formal proceedings",
    x: 570,
    y: 200,
    width: 300,
    height: 225,
  },
  {
    id: "mun-7",
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&q=85",
    alt: "Note-taking delegate",
    x: -10,
    y: 415,
    width: 295,
    height: 220,
  },
  {
    id: "mun-8",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=480&q=85",
    alt: "Auditorium session",
    x: 270,
    y: 415,
    width: 310,
    height: 220,
  },
  {
    id: "mun-9",
    src: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=480&q=85",
    alt: "Delegates in hall",
    x: 565,
    y: 415,
    width: 305,
    height: 220,
  },
];
