export type { IPoint };

interface IPoint {
  getX(): number;
  getY(): number;
  getAngle(): number;
  getSquaredDistanceFrom(x: number, y: number): number;
}
