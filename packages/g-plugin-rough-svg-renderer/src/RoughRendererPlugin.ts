import type { RenderingPlugin, RenderingService } from '@antv/g-lite';
import {
  CanvasConfig,
  ContextService,
  inject,
  RenderingPluginContribution,
  singleton,
} from '@antv/g-lite';
// @see https://github.com/rough-stuff/rough/issues/145
import rough from 'roughjs/bin/rough';

@singleton({ contrib: RenderingPluginContribution })
export class RoughRendererPlugin implements RenderingPlugin {
  static tag = 'RoughSVGRenderer';

  constructor(
    @inject(CanvasConfig)
    private canvasConfig: CanvasConfig,

    @inject(ContextService)
    private contextService: ContextService<SVGSVGElement>,
  ) {}

  apply(renderingService: RenderingService) {
    renderingService.hooks.init.tapPromise(RoughRendererPlugin.tag, async () => {
      /**
       * disable dirtycheck & dirty rectangle rendering
       */
      // this.canvasConfig.renderer.getConfig().enableDirtyCheck = false;
      // this.canvasConfig.renderer.getConfig().enableDirtyRectangleRendering = false;

      // @see https://github.com/rough-stuff/rough/wiki#roughsvg-svgroot--config

      const $svg = this.contextService.getContext();

      // @ts-ignore
      $svg.roughSVG = rough.svg($svg);
    });

    renderingService.hooks.destroy.tap(RoughRendererPlugin.tag, () => {});
  }
}
