const CanvasWidget$ = include('src/components/canvasWidget/CanvasWidget.js');
const ValueWidget$ = include('src/components/valueWidget/ValueWidget.js');
const { eq$ } = include('src/libraries/observable/utils.js');
const { Choose$ } = include('src/libraries/observableHtml/utils.js');
const TextArea = include('src/libraries/simpleUI/TextArea.js');
const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');
const PaddedContainer = include('src/libraries/simpleUI/PaddedContainer.js');
const Container = include('src/libraries/simpleUI/Container.js');
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

  const codeEditorContainer = Object.assign(PaddedContainer(), {
    children: [codeEditor],
  });

  const widgetsContainer = Container();

  const updateWidgets = () => {
    const widgets = [
      ...viewModel.widgets
        .filter(({ isEmpty$ }) => !isEmpty$.value)
        .map(
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
            const paddedContainer = document.createElement('span');
            paddedContainer.appendChild(widget);
            Object.assign(paddedContainer.style, {
              padding: '10px',
              display: 'inline-block',
            });
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
            return paddedContainer;
          }
        ),
    ];
    Object.assign(widgetsContainer, {
      children: [...widgets],
    });
  };

  // This should replaced with a single setter
  viewModel.widgets.forEach(
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
      addEventListener(type$.id, updateWidgets);
      addEventListener(label$.id, updateWidgets);
      addEventListener(value$.id, updateWidgets);
      addEventListener(surfaces$.id, updateWidgets);
      addEventListener(edges$.id, updateWidgets);
      addEventListener(is3d$.id, updateWidgets);
      addEventListener(center$.id, updateWidgets);
      addEventListener(isEmpty$.id, updateWidgets);
    }
  );

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
