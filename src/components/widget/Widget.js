const WidgetContainer = include('src/components/widget/WidgetContainer.js');
const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');

const Widget = () => {
  const widgetContainer = WidgetContainer();
  Object.assign(widgetContainer.style, {
    height: '288px',
    width: '448px',
  });

  Object.defineProperty(widgetContainer, 'widgetDescription', {
    set: (widgetDescription) => {
      if (
        widgetDescription.type === 'canvas-widget' &&
        widgetDescription.is3d
      ) {
        const canvas3dWidget = Canvas3dWidget();
        canvas3dWidget.widgetDescription = widgetDescription;
        widgetContainer.children = [canvas3dWidget];
      }
      if (
        widgetDescription.type === 'canvas-widget' &&
        !widgetDescription.is3d
      ) {
        const canvas2dWidget = Canvas2dWidget();
        canvas2dWidget.widgetDescription = widgetDescription;
        widgetContainer.children = [canvas2dWidget];
      }
      if (widgetDescription.type === 'value-widget') {
        const valueWidget = ValueWidget();
        valueWidget.widgetDescription = widgetDescription;
        widgetContainer.children = [valueWidget];
      }
    },
  });
  return widgetContainer;
};

module.exports = Widget;
