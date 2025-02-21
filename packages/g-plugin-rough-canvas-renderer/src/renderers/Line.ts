import { CanvasRenderer } from '@antv/g-canvas';
import type { DisplayObject, ParsedLineStyleProps } from '@antv/g-lite';
import { singleton } from '@antv/g-lite';
import { generateRoughOptions } from '../util';

@singleton({
  token: CanvasRenderer.LineRendererContribution,
})
export class LineRenderer implements CanvasRenderer.StyleRenderer {
  render(
    context: CanvasRenderingContext2D,
    parsedStyle: ParsedLineStyleProps,
    object: DisplayObject<any, any>,
  ) {
    const { x1, y1, x2, y2, defX = 0, defY = 0 } = parsedStyle as ParsedLineStyleProps;
    // @see https://github.com/rough-stuff/rough/wiki#line-x1-y1-x2-y2--options
    // @ts-ignore
    context.roughCanvas.line(
      x1 - defX,
      y1 - defY,
      x2 - defX,
      y2 - defY,
      generateRoughOptions(object),
    );
  }
}
