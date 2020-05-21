const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { compose, If } = include('src/libraries/simpleHTML/SimpleHTML.js');

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
    [
      If(
        () => getProps().type === 'canvas-widget',
        () => [
          If(
            () => getProps().is3d,
            [Canvas3dWidget(getProps)],
            [Canvas2dWidget(getProps)]
          ),
        ]
      ),
      If(
        () => getProps().type === 'value-widget',
        () => [ValueWidget(getProps)]
      ),
    ]
  );

  return element;
};

module.exports = Widget;
