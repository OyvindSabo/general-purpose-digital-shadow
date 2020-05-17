const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

/**
 *
 * @param {{
 *   type: 'canvas-widget' | 'value-widget';
 *   label: string;
 *   value: number;
 *   surfaces: { color: string, points: [number, number, number][] }[];
 *   edges: [[number, number, number][]];
 *   center: [number, number, number];
 *   is3d: boolean;
 * }} props
 *
 * @returns { HTMLElement }
 */
const getWidgetElementByType = (getProps) => {
  const { type, is3d } = getProps();
  console.log('widget type: ', getProps().type);
  if (type === 'canvas-widget') {
    return is3d ? Canvas3dWidget(getProps) : Canvas2dWidget(getProps);
  }
  if (type === 'value-widget') {
    return ValueWidget(getProps);
  }
  throw Error('A widget must have type canvas-widget or value-widget');
};

/**
 *
 * @param {{
 *   type: 'canvas-widget' | 'value-widget';
 *   label: string;
 *   value: number;
 *   surfaces: { color: string, points: [number, number, number][] }[];
 *   edges: [[number, number, number][]];
 *   center: [number, number, number];
 *   is3d: boolean;
 * }} props
 *
 * @returns { HTMLElement }
 */
const Widget = (getProps) => {
  const element = compose(
    'span',
    () => ({
      style: {
        padding: '10px',
        display: 'inline-block',
        verticalAlign: 'top',
        background: 'white',
        width: '480px', // 24 x SizeUnit
        height: '320px', // 16 x SizeUnit
        boxShadow: 'rgba(0, 0, 0, 0.25) 0 0 10px -5px',
      },
    }),
    [getWidgetElementByType(getProps)]
  );
  return element;
};

module.exports = Widget;
