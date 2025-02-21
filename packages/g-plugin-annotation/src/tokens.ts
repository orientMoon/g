import { Syringe } from '@antv/g-lite';
import type { DrawerStyle } from './interface/drawer';

export const AnnotationPluginOptions = Syringe.defineToken('');
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface AnnotationPluginOptions {
  /**
   * Style for selectable UI.
   */
  selectableStyle: Partial<SelectableStyle>;

  /**
   * Style for drawer.
   */
  drawerStyle: Partial<DrawerStyle>;

  /**
   * Switch between drawing mode & select mode.
   */
  isDrawingMode: boolean;

  /**
   * The length target should move after arrow key pressed in canvas coordinates.
   */
  arrowKeyStepLength: number;

  /**
   * Switch between drawing mode & select mode.
   */
  enableAutoSwitchDrawingMode: boolean;

  /**
   * Delete target with shortcuts, e.g. Delete, Esc
   */
  enableDeleteTargetWithShortcuts: boolean;
}

// @see http://fabricjs.com/fabric-intro-part-4#customization
export interface SelectableStyle {
  selectionFill: string;
  selectionFillOpacity: number;
  selectionStroke: string;
  selectionStrokeOpacity: number;
  selectionStrokeWidth: number;
  selectionLineDash: number | string | (string | number)[];
  anchorFill: string;
  anchorStroke: string;
  anchorSize: string | number;
  anchorFillOpacity: number;
  anchorStrokeOpacity: number;
  anchorStrokeWidth: number;
}
