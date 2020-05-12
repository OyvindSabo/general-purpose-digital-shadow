const CanvasWidget$ = include('src/components/canvasWidget/CanvasWidget.js');
const ValueWidget$ = include('src/components/valueWidget/ValueWidget.js');
const { eq$ } = include('src/libraries/observable/utils.js');
const { Choose$ } = include('src/libraries/observableHtml/utils.js');
const TextArea = include('src/libraries/simpleUI/TextArea.js');
const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');
const PaddedContainer = include('src/libraries/simpleUI/PaddedContainer.js');
const Widget = include('src/components/widget/Widget.js');
const { doAddShadow } = include('src/libraries/simpleHTML/SimpleHTML.js');

const Dashboard$ = ({ viewModel, currentRoute$ }) => {
  const { isExported } = viewModel;
  const codeEditorIsOpen$ = eq$(
    currentRoute$,
    '/projects/<projectId:string>/dashboard/edit'
  );
  const codeEditor = Object.assign(TextArea(), {
    value: viewModel.selectedWidgetsCode$.value,
    heightUnits: 15,
  });

  codeEditor.addEventListener('input', ({ target }) => {
    viewModel.updateWidgetsCode(
      viewModel.selectedProjectId$.value,
      target.value
    );
  });

  const widgets = [
    ...viewModel.widgets.map(
      ({
        label$,
        type$,
        value$,
        surfaces$,
        edges$,
        is3d$,
        center$,
        isEmpty$,
      }) => {
        const widget = Widget();
        doAddShadow(widget);
        const paddedContainer = PaddedContainer();
        paddedContainer.children = [widget];
        const updateWidgetDescription = () => {
          widget.widgetDescription = {
            type: type$.value,
            label: label$.value,
            value: value$.value,
            surfaces: surfaces$.value,
            edges: edges$.value,
            is3d: is3d$.value,
            center: center$.value,
            isEmpty: isEmpty$.value,
          };
        };
        addEventListener(type$.id, updateWidgetDescription);
        addEventListener(label$.id, updateWidgetDescription);
        addEventListener(value$.id, updateWidgetDescription);
        addEventListener(surfaces$.id, updateWidgetDescription);
        addEventListener(edges$.id, updateWidgetDescription);
        addEventListener(is3d$.id, updateWidgetDescription);
        addEventListener(center$.id, updateWidgetDescription);
        addEventListener(isEmpty$.id, updateWidgetDescription);
        return paddedContainer;
      }
    ),
  ];

  const codeEditorContainer = Object.assign(PaddedContainer(), {
    children: [codeEditor],
  });

  const widgetsContainer = Object.assign(PaddedContainer(), {
    children: [...widgets],
  });

  const getDashboardChildren = () =>
    codeEditorIsOpen$.value && !isExported
      ? [codeEditorContainer, widgetsContainer]
      : [widgetsContainer];

  const dashboardContainer = Object.assign(PaddedContainer(), {
    children: getDashboardChildren(),
  });

  addEventListener(codeEditorIsOpen$.id, () => {
    doUpdateChildren(dashboardContainer, getDashboardChildren());
  });
  addEventListener(viewModel.selectedWidgetsCode$.id, () => {
    codeEditor.value = viewModel.selectedWidgetsCode$.value;
  });

  return dashboardContainer;
};

module.exports = Dashboard$;
