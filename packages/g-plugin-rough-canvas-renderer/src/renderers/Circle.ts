import { CanvasRenderer } from '@antv/g-canvas';
import type { DisplayObject, ParsedCircleStyleProps } from '@antv/g-lite';
import { singleton } from '@antv/g-lite';
import { generateRoughOptions } from '../util';

@singleton({
  token: CanvasRenderer.CircleRendererContribution,
})
export class CircleRenderer implements CanvasRenderer.StyleRenderer {
  render(
    context: CanvasRenderingContext2D,
    parsedStyle: ParsedCircleStyleProps,
    object: DisplayObject<any, any>,
  ) {
    const { r } = parsedStyle as ParsedCircleStyleProps;
    // rough.js use diameter instead of radius
    // @see https://github.com/rough-stuff/rough/wiki#circle-x-y-diameter--options
    // @ts-ignore
    context.roughCanvas.circle(r, r, r * 2, generateRoughOptions(object));
  }
}
