const styled = include('src/libraries/styled/styled.js');
const { textArea$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const FullWidthCard$ = include('src/components/fullWidthCard/FullWidthCard.js');

// TODO: Remvoe this or replace it with newer code
const CodeEditor$ = (value) => {
  const textAreaElement = textArea$(value).setStyle({
    padding: '20px',
    width: 'calc(100% - 96px)',
    height: 'calc(100% - 32px)',
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
    overflow: 'auto',
  });
  element.onInput = textAreaElement.onInput;
  return element;
};

module.exports = CodeEditor$;
