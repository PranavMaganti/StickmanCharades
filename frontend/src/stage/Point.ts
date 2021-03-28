export type { Point };

interface Point {
  getX(): number;
  getY(): number;
  getAngle(): number;
  getSquaredDistanceFrom(x: number, y: number): number;
}
