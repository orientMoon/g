import type { InteractivePointerEvent, RenderingPlugin, RenderingService } from '@antv/g-lite';
import { ContextService, inject, RenderingPluginContribution, singleton } from '@antv/g-lite';
/**
 * listen to mouse/touch/pointer events on DOM wrapper, trigger pointer events
 */
@singleton({ contrib: RenderingPluginContribution })
export class MobileInteractionPlugin implements RenderingPlugin {
  static tag = 'MobileInteraction';

  constructor(
    @inject(ContextService)
    private contextService: ContextService<CanvasRenderingContext2D>,
  ) {}

  apply(renderingService: RenderingService) {
    // 获取小程序上下文
    const canvasEl = this.contextService.getDomElement();

    const onPointerDown = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerDown.call(ev);
    };

    const onPointerUp = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerUp.call(ev);
    };

    const onPointerMove = (ev: InteractivePointerEvent) => {
      // 触发 G 定义的标准 pointerMove 事件
      renderingService.hooks.pointerMove.call(ev);
    };

    const onPointerOver = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerOver.call(ev);
    };

    const onPointerOut = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerOut.call(ev);
    };

    const onPointerCancel = (ev: InteractivePointerEvent) => {
      renderingService.hooks.pointerCancel.call(ev);
    };

    renderingService.hooks.init.tapPromise(MobileInteractionPlugin.tag, async () => {
      // 基于小程序上下文的事件监听方式，绑定事件监听，可以参考下面基于 DOM 的方式
      canvasEl.addEventListener('touchstart', onPointerDown, true);
      canvasEl.addEventListener('touchend', onPointerUp, true);
      canvasEl.addEventListener('touchmove', onPointerMove, true);
      canvasEl.addEventListener('touchcancel', onPointerCancel, true);

      // FIXME: 这里不应该只在 canvasEl 上监听 mousemove 和 mouseup，而应该在更高层级的节点上例如 document 监听。
      // 否则无法判断是否移出了 canvasEl
      canvasEl.addEventListener('mousemove', onPointerMove, true);
      canvasEl.addEventListener('mousedown', onPointerDown, true);
      canvasEl.addEventListener('mouseout', onPointerOut, true);
      canvasEl.addEventListener('mouseover', onPointerOver, true);
      canvasEl.addEventListener('mouseup', onPointerUp, true);
    });

    renderingService.hooks.destroy.tap(MobileInteractionPlugin.tag, () => {
      // 基于小程序上下文的事件监听方式，移除事件监听
      canvasEl.removeEventListener('touchstart', onPointerDown, true);
      canvasEl.removeEventListener('touchend', onPointerUp, true);
      canvasEl.removeEventListener('touchmove', onPointerMove, true);
      canvasEl.removeEventListener('touchcancel', onPointerCancel, true);

      canvasEl.removeEventListener('mousemove', onPointerMove, true);
      canvasEl.removeEventListener('mousedown', onPointerDown, true);
      canvasEl.removeEventListener('mouseout', onPointerOut, true);
      canvasEl.removeEventListener('mouseover', onPointerOver, true);
      canvasEl.removeEventListener('mouseup', onPointerUp, true);
    });
  }
}
