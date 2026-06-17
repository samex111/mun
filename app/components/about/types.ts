export interface CollageImage {
  id: string;
  src: string;
  alt: string;
  /** Position in the large collage canvas (px) */
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  /**
   * Organic drift: supply a keyframe array [kf0, kf1, kf2, …] per axis.
   * This produces a wandering motion rather than a simple reverse ping-pong.
   */
  motionConfig: {
    x?: number[];
    y?: number[];
    scale?: number[];
    rotate?: number[];
    duration: number;
  };
}

export interface StaticImage {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
