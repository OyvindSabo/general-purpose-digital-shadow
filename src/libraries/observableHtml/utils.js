const Observable = include('src/libraries/observable/Observable.js');
const { valueOf$ } = include('src/libraries/observable/utils.js');
const styled = include('src/libraries/styled/styled.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const Choose$ = (observable, element1, element2) => {
  let element = valueOf$(observable) ? element1 : element2;
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      // TODO: Make it possible to set a specific child of an observable
      newElement = valueOf$(observable) ? element1 : element2;

      if (newElement !== element && element.parentNode) {
        element.parentNode.replaceChild(newElement, element);
        element = newElement;
      }
    });
  }
  return element;
};

const Switch$ = (statement$, ...clauses) => {
  const cases = clauses.filter((_, i) => i % 2 === 0);
  const elements = clauses.filter((_, i) => i % 2 !== 0);
  return div$(
    ...cases.map((theCase, i) => {
      const element = elements[i];
      // Warning: Assumes that display is not initially dynamic
      const display = element.style.display;
      return element.setStyle({
        display: choose$(eq$(statement$, theCase), display, 'none'),
      });
    })
  );
};

const Nothing$ = styled({ display: 'none' })(div$);

const If$ = (observable, element) => Choose$(observable, element, Nothing$());

module.exports = {
  Choose$,
  Switch$,
  Nothing$,
  If$,
};
