import { Line as LineUtil } from '@antv/g-math';
import { vec3 } from 'gl-matrix';
import type { DisplayObjectConfig } from '../dom';
import { Point } from '../shapes';
import type { BaseStyleProps, ParsedBaseStyleProps } from '../types';
import { Shape } from '../types';
import type { DisplayObject } from './DisplayObject';
import { Polygon } from './Polygon';

export interface PolylineStyleProps extends BaseStyleProps {
  points: [number, number][];
  /**
   * marker will be positioned at the first point
   */
  markerStart?: DisplayObject;

  /**
   * marker will be positioned at the last point
   */
  markerEnd?: DisplayObject;

  markerMid?: DisplayObject;

  /**
   * offset relative to original position
   */
  markerStartOffset?: number;

  /**
   * offset relative to original position
   */
  markerEndOffset?: number;
}
export interface ParsedPolylineStyleProps extends ParsedBaseStyleProps {
  points: {
    points: [number, number][];
    segments: [number, number][];
    totalLength: number;
  };
  markerStart?: DisplayObject;
  markerMid?: DisplayObject;
  markerEnd?: DisplayObject;
  markerStartOffset?: number;
  markerEndOffset?: number;
}

/**
 * Polyline inherits the marker-related capabilities of Polygon.
 */
export class Polyline extends Polygon {
  constructor({ style, ...rest }: DisplayObjectConfig<PolylineStyleProps> = {}) {
    super({
      type: Shape.POLYLINE,
      style: {
        points: '',
        miterLimit: '',
        isClosed: false,
        ...style,
      },
      ...rest,
    });
  }

  getTotalLength() {
    return this.parsedStyle.points.totalLength;
  }

  getPointAtLength(distance: number): Point {
    return this.getPoint(distance / this.getTotalLength());
  }

  getPoint(ratio: number): Point {
    const {
      defX,
      defY,
      points: { points, segments },
    } = this.parsedStyle;

    let subt = 0;
    let index = 0;
    segments.forEach((v, i) => {
      if (ratio >= v[0] && ratio <= v[1]) {
        subt = (ratio - v[0]) / (v[1] - v[0]);
        index = i;
      }
    });

    const { x, y } = LineUtil.pointAt(
      points[index][0],
      points[index][1],
      points[index + 1][0],
      points[index + 1][1],
      subt,
    );

    const transformed = vec3.transformMat4(
      vec3.create(),
      vec3.fromValues(x - defX, y - defY, 0),
      this.getLocalTransform(),
    );

    // apply local transformation
    return new Point(transformed[0], transformed[1]);
  }

  getStartTangent(): number[][] {
    const { points } = this.parsedStyle.points;
    const result = [];
    result.push([points[1][0], points[1][1]]);
    result.push([points[0][0], points[0][1]]);
    return result;
  }

  getEndTangent(): number[][] {
    const { points } = this.parsedStyle.points;
    const l = points.length - 1;
    const result = [];
    result.push([points[l - 1][0], points[l - 1][1]]);
    result.push([points[l][0], points[l][1]]);
    return result;
  }
}
