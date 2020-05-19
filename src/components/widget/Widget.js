const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

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
 * getProps: () => ({
 *   type: 'canvas-widget' | 'value-widget';
 *   label: string;
 *   value: number;
 *   surfaces: { color: string, points: [number, number, number][] }[];
 *   edges: [[number, number, number][]];
 *   center: [number, number, number];
 *   is3d: boolean;
 * })
 */
const Widget = (getProps) => {
  const element = compose(
    'span',
    {
      // width = 24 x 20px
      // height = 16 x 20px
      style: `padding: 10px;
              display: inline-block;
              vertical-align: top;
              background: white;
              width: 480px;
              height: 320px;
              box-shadow: rgba(0, 0, 0, 0.25) 0 0 10px -5px;`,
    },
    [getWidgetElementByType(getProps)]
  );

  return Object.assign(element, { key: 'widget' });
};

module.exports = Widget;
