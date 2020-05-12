const WidgetContainer = include('src/components/widget/WidgetContainer.js');
const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Widget = () => {
  const widgetContainer = document.createElement('span');
  Object.assign(widgetContainer.style, {
    display: 'inline-block',
    verticalAlign: 'top',
    background: 'white',
    // 24 x SizeUnit
    width: '480px',
    // 16 x SizeUnit
    height: '320px',
  });

  Object.defineProperty(widgetContainer, 'widgetDescription', {
    set: (widgetDescription) => {
      if (
        widgetDescription.type === 'canvas-widget' &&
        widgetDescription.is3d
      ) {
        const canvas3dWidget = Canvas3dWidget();
        canvas3dWidget.widgetDescription = widgetDescription;
        doUpdateChildren(widgetContainer, [canvas3dWidget]);
      }
      if (
        widgetDescription.type === 'canvas-widget' &&
        !widgetDescription.is3d
      ) {
        const canvas2dWidget = Canvas2dWidget();
        canvas2dWidget.widgetDescription = widgetDescription;
        doUpdateChildren(widgetContainer, [canvas2dWidget]);
      }
      if (widgetDescription.type === 'value-widget') {
        const valueWidget = ValueWidget();
        valueWidget.widgetDescription = widgetDescription;
        doUpdateChildren(widgetContainer, [valueWidget]);
      }
    },
  });
  return widgetContainer;
};

module.exports = Widget;
