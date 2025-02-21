import { singleton } from '@antv/g-lite';
import type { Device } from '../platform';
import { DynamicUniformBuffer } from './DynamicUniformBuffer';
import { RenderCache } from './RenderCache';
import { RenderGraph } from './RenderGraph';
import type { RenderInst } from './RenderInst';
import { RenderInstManager } from './RenderInstManager';

@singleton()
export class RenderHelper {
  renderCache: RenderCache;
  renderGraph: RenderGraph;
  renderInstManager: RenderInstManager;
  uniformBuffer: DynamicUniformBuffer;
  // debugThumbnails: DebugThumbnailDrawer;

  private device: Device;

  getDevice(): Device {
    return this.device;
  }

  setDevice(device: Device) {
    this.device = device;

    this.renderCache = new RenderCache(device);
    this.renderGraph = new RenderGraph(this.device);
    this.renderInstManager = new RenderInstManager(this.renderCache);
    this.uniformBuffer = new DynamicUniformBuffer(this.device);
    // this.debugThumbnails = new DebugThumbnailDrawer(this);
  }

  pushTemplateRenderInst(): RenderInst {
    const template = this.renderInstManager.pushTemplateRenderInst();
    template.setUniformBuffer(this.uniformBuffer);
    return template;
  }

  prepareToRender(): void {
    this.uniformBuffer.prepareToRender();
  }

  destroy(): void {
    if (this.uniformBuffer) {
      this.uniformBuffer.destroy();
    }
    if (this.renderInstManager) {
      this.renderInstManager.destroy();
    }
    this.renderCache.destroy();
    this.renderGraph.destroy();
  }

  // getDebugTextDrawer(): TextDrawer | null {
  //   return null;
  // }

  getCache(): RenderCache {
    return this.renderCache;
  }
}
