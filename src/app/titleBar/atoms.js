const { div$, a$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const styled = include('src/libraries/styled/styled.js');
const { defineComponent, div, span } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const ViewTitle = defineComponent((props, ...children) => {
  return div(
    {
      ...props,
      style: { fontSize: '32px', padding: '16px', display: 'inline-block' },
    },
    ...children
  );
});

const ExportButton = defineComponent((props, ...children) => {
  return div(
    {
      ...props,
      style: {
        fontSize: '16px',
        padding: '0 16px',
        float: 'right',
        lineHeight: '64px',
        cursor: 'pointer',
      },
    },
    ...children
  );
});

module.exports = { ViewTitle, ExportButton };
