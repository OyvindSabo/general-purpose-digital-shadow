const styled = include('src/libraries/styled/styled.js');
const { textArea$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const FullWidthCard$ = include('src/components/fullWidthCard/FullWidthCard.js');

const CodeEditor$ = (value) => {
  const textAreaElement = textArea$(value).setStyle({
    padding: '20px',
    width: '100%',
    height: '100%',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    border: 'none',
    color: 'darkslategray',
  });
  const element = FullWidthCard$(textAreaElement).setStyle({
    height: 'calc(100% - 64px)',
    boxSizing: 'border-box',
  });
  element.onInput = textAreaElement.onInput;
  return element;
};

module.exports = CodeEditor$;
