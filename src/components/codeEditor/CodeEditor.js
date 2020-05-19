const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const CodeEditor = (getProps) => {
  const element = compose('div', { style: 'padding: 10px;' }, [
    compose(
      'textarea',
      () => {
        const { value, oninput } = getProps();
        return {
          oninput,
          style: `height: 300px;
                  border-radius: 5px;
                  font-family: "Courier New", Courier, monospace;
                  background: rgba(0, 0, 0, 0.05);
                  outline: none;
                  font-size: 15px;
                  padding: 10px;
                  border: none;
                  resize: none;
                  width: 100%;
                  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;`,
          value,
        };
      },
      []
    ),
  ]);
  return Object.assign(element, { key: 'code-editor' });
};

module.exports = CodeEditor;
