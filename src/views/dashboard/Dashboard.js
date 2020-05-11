const CanvasWidget$ = include('src/components/canvasWidget/CanvasWidget.js');
const ValueWidget$ = include('src/components/valueWidget/ValueWidget.js');
const { eq$ } = include('src/libraries/observable/utils.js');
const { Choose$ } = include('src/libraries/observableHtml/utils.js');
const ExpandingTextArea = include(
  'src/libraries/simpleUI/ExpandingTextArea.js'
);
const { doUpdateChildren } = include('src/libraries/simpleHTML/SimpleHTML.js');
const Container = include('src/libraries/simpleUI/Container.js');
const PaddedContainer = include('src/libraries/simpleUI/PaddedContainer.js');

const Widget$ = ({
  label$,
  type$,
  value$,
  surfaces$,
  edges$,
  is3d$,
  center$,
  isEmpty$,
}) => {
  return Choose$(
    eq$(type$, 'canvas-widget'),
    CanvasWidget$({
      label$,
      type$,
      value$,
      surfaces$,
      edges$,
      is3d$,
      center$,
      isEmpty$,
    }),
    // eq$(type$, 'number-widget')
    ValueWidget$({ label$, value$, isEmpty$ })
  );
};

const Dashboard$ = ({ viewModel, currentRoute$ }) => {
  const { isExported } = viewModel;
  const codeEditorIsOpen$ = eq$(
    currentRoute$,
    '/projects/<projectId:string>/dashboard/edit'
  );
  const codeEditor = Object.assign(ExpandingTextArea(), {
    value: viewModel.selectedWidgetsCode$.value,
    minHeightUnits: 5,
    maxHeightUnits: 20,
  });

  codeEditor.addEventListener('input', ({ target }) => {
    viewModel.updateWidgetsCode(
      viewModel.selectedProjectId$.value,
      target.value
    );
  });

  const widgets = [...viewModel.widgets.map(Widget$)];

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
