export interface CollageImage {
  id: string;
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  motionConfig: {
    x?: [number, number];
    y?: [number, number];
    scale?: [number, number];
    rotate?: [number, number];
    duration: number;
  };
}

export interface SMJMaskProps {
  width: number;
  height: number;
  fontSize: number;
  children: React.ReactNode;
}

export interface MUNMaskProps {
  width: number;
  height: number;
  fontSize: number;
  children: React.ReactNode;
}
