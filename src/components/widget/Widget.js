const WidgetContainer = include('src/components/widget/WidgetContainer.js');
const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { compose, doPatchChildren } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

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
const getWidgetElementByType = (props) => {
  if (props.type === 'canvas-widget') {
    return props.is3d ? Canvas3dWidget(props) : Canvas2dWidget(props);
  }
  if (props.type === 'value-widget') {
    return ValueWidget(props);
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
const Widget = (props) => {
  const previousProps = props;
  const element = compose(
    'span',
    {
      style: {
        padding: '10px',
        display: 'inline-block',
        verticalAlign: 'top',
        background: 'white',
        width: '480px', // 24 x SizeUnit
        height: '320px', // 16 x SizeUnit
        boxShadow: 'rgba(0, 0, 0, 0.25) 0 0 10px -5px',
      },
    },
    [getWidgetElementByType(props)]
  );
  element.update = (newProps) => {
    if (newProps.type == previousProps.type) {
      element.childNodes[0].update(newProps);
    } else {
      doPatchChildren(element, [getWidgetElementByType(props)]);
    }
    Object.assign(previousProps, newProps);
  };
  return element;
};

module.exports = Widget;
