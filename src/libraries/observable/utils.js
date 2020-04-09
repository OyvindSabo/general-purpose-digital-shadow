const Observable = include('src/libraries/observable/Observable.js');

const valueOf$ = (observable$) =>
  observable$ instanceof Observable ? observable$.value : observable$;

const isObservable$ = (observable$) => observable$ instanceof Observable;

// Currently needs at least two arguments
const add$ = (...observables) => {
  const sum = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a + b);
  const sum$ = new Observable(sum);
  observables
    .filter((observable) => observable instanceof Observable)
    .forEach((observable) => {
      window.addEventListener(observable.id, ({ detail }) => {
        const sum = observables
          .map((observable) =>
            observable instanceof Observable ? observable.value : observable
          )
          .reduce((a, b) => a + b);
        sum$.value = sum;
      });
    });
  return sum$;
};

// Currently needs at least two arguments
const subtract$ = (...observables) => {
  const difference = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a - b);
  const difference$ = new Observable(difference);
  observables.forEach((observable) => {
    window.addEventListener(observable.id, ({ detail }) => {
      const difference = observables
        .map((observable) =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a - b);
      difference$.value = difference;
    });
  });
  return difference$;
};

// Currently needs at least two arguments
const multiply$ = (...observables) => {
  const product = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a * b);
  const product$ = new Observable(product);
  observables.forEach((observable) => {
    window.addEventListener(observable.id, ({ detail }) => {
      const product = observables
        .map((observable) =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a * b);
      product$.value = product;
    });
  });
  return product$;
};

// Currently needs at least two arguments
const divide$ = (...observables) => {
  const quotient = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a / b);
  const quotient$ = new Observable(quotient);
  observables.forEach((observable) => {
    window.addEventListener(observable.id, ({ detail }) => {
      const quotient = observables
        .map((observable) =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a / b);
      quotient$.value = quotient;
    });
  });
  return quotient$;
};

const choose$ = (observable, option1, option2) => {
  const result$ = new Observable(
    (observable instanceof Observable ? observable.value : observable)
      ? option1 instanceof Observable
        ? option1.value
        : option1
      : option2 instanceof Observable
      ? option2.value
      : option2
  );
  [observable, option1, option2]
    .filter((observable) => observable instanceof Observable)
    .forEach((observable) => {
      window.addEventListener(observable.id, ({ detail }) => {
        // TODO: Make it possible to set a specific child of an observable
        result$.value = (
          observable instanceof Observable ? observable.value : observable
        )
          ? option1 instanceof Observable
            ? option1.value
            : option1
          : option2 instanceof Observable
          ? option2.value
          : option2;
      });
    });
  return result$;
};

const cond$ = (...clauses) => {
  const result = clauses
    .map(([test, expression]) => [
      test instanceof Observable ? test.value : test,
      expression instanceof Observable ? expression.value : expression,
    ])
    .reduce((result, [test, expression]) => {
      if (result !== null) return result;
      if (test) return expression;
      return null;
    }, null);

  const result$ = new Observable(result);

  clauses
    .flat()
    .filter((testOrExpression) => testOrExpression instanceof Observable)
    .forEach((testOrExpression) => {
      window.addEventListener(testOrExpression.id, ({ detail }) => {
        const result = clauses
          .map(([test, expression]) => [
            test instanceof Observable ? test.value : test,
            expression instanceof Observable ? expression.value : expression,
          ])
          .reduce((result, [test, expression]) => {
            if (result !== null) return result;
            if (test) return expression;
            return null;
          }, null);
        result$.value = result;
      });
    });

  return result$;
};

const eq$ = (...observables) => {
  const equality = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .every((element, _, array) => element === array[0]);
  const equality$ = new Observable(equality);
  observables.forEach((observable) => {
    window.addEventListener(observable.id, ({ detail }) => {
      const equality = observables
        .map((observable) =>
          observable instanceof Observable ? observable.value : observable
        )
        .every((element, _, array) => element === array[0]);
      equality$.value = equality;
    });
  });
  return equality$;
};

const and$ = (...observables) => {
  const allTruthy = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .every(Boolean);
  const allTruthy$ = new Observable(allTruthy);
  observables.forEach((observable) => {
    window.addEventListener(observable.id, ({ detail }) => {
      const allTruthy = observables
        .map((observable) =>
          observable instanceof Observable ? observable.value : observable
        )
        .every(Boolean);
      allTruthy$.value = allTruthy;
    });
  });
  return allTruthy$;
};

const or$ = (...observables) => {
  const someTruthy = observables
    .map((observable) =>
      observable instanceof Observable ? observable.value : observable
    )
    .some(Boolean);
  const someTruthy$ = new Observable(someTruthy);
  observables
    .filter((observable) => observable instanceof Observable)
    .forEach((observable) => {
      window.addEventListener(observable.id, ({ detail }) => {
        const someTruthy = observables
          .map((observable) =>
            observable instanceof Observable ? observable.value : observable
          )
          .some(Boolean);
        someTruthy$.value = someTruthy;
      });
    });
  return someTruthy$;
};

const not$ = (observable) => {
  const conditional =
    observable instanceof Observable ? observable.value : observable;
  const opposite$ = new Observable(!conditional);
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      opposite$.value = !detail;
    });
  }
  return opposite$;
};

const Number$ = (maybeNumber$) => {
  const number$ = new Observable(Number(valueOf$(maybeNumber$)));
  if (isObservable$(maybeNumber$)) {
    window.addEventListener(maybeNumber$.id, () => {
      number$.value = Number(valueOf$(maybeNumber$));
    });
  }
  return number$;
};

const toFixed$ = (number$, decimals$) => {
  const number = number$ instanceof Observable ? number$.value : number$;
  const decimals =
    decimals$ instanceof Observable ? decimals$.value : decimals$;
  const formattedNumber = number.toFixed(decimals);
  const formattedNumber$ = new Observable(formattedNumber);
  [number$, decimals$]
    .filter((observable) => observable instanceof Observable)
    .forEach((observable) => {
      window.addEventListener(observable.id, ({ detail }) => {
        const number = number$ instanceof Observable ? number$.value : number$;
        const decimals =
          decimals$ instanceof Observable ? decimals$.value : decimals$;
        const formattedNumber = number.toFixed(decimals);
        formattedNumber$.value = formattedNumber;
      });
    });
  return formattedNumber$;
};

const slice$ = (stringOrArray$, start$, stop$) => {
  const stringOrArray =
    stringOrArray$ instanceof Observable
      ? stringOrArray$.value
      : stringOrArray$;
  const start = start$ instanceof Observable ? start$.value : start$;
  const stop = stop$ instanceof Observable ? stop$.value : stop$;
  const slicedStringOrArray$ = new Observable(stringOrArray.slice(start, stop));
  [stringOrArray$, start$, stop$]
    .filter((observable) => observable instanceof Observable)
    .forEach((observable) => {
      window.addEventListener(observable.id, ({ detail }) => {
        const stringOrArray =
          stringOrArray$ instanceof Observable
            ? stringOrArray$.value
            : stringOrArray$;
        const start = start$ instanceof Observable ? start$.value : start$;
        const stop = stop$ instanceof Observable ? stop$.value : stop$;
        slicedStringOrArray$.value = stringOrArray.slice(start, stop);
      });
    });
  return slicedStringOrArray$;
};

const length$ = (stringOrArray$) => {
  const length$ = new Observable(valueOf$(stringOrArray$).length);
  if (isObservable$(stringOrArray$)) {
    window.addEventListener(stringOrArray$.id, () => {
      lenth$.value = valueOf$(stringOrArray$).length;
    });
  }
  return length$;
};

const map$ = (array$, function$) => {
  const mappedArray$ = new Observable(
    valueOf$(array$).map(valueOf$(function$))
  );

  [array$, function$].filter(isObservable$).forEach((observable) => {
    window.addEventListener(observable.id, () => {
      mappedArray$.value = valueOf$(array$).map(valueOf$(function$));
    });
  });

  return mappedArray$;
};

const startsWith$ = (includingString$, includedString$) => {
  const includingString =
    includingString$ instanceof Observable
      ? includingString$.value
      : includingString$;

  const includedString =
    includedString$ instanceof Observable
      ? includedString$.value
      : includedString$;

  const includingStringIncludesIncludedString =
    includingString.indexOf(includedString) === 0;

  const includingStringIncludesIncludedString$ = new Observable(
    includingStringIncludesIncludedString
  );

  [includingString$, includedString$]
    .filter((string) => string instanceof Observable)
    .forEach((string) => {
      window.addEventListener(string.id, ({ detail }) => {
        const includingString =
          includingString$ instanceof Observable
            ? includingString$.value
            : includingString$;

        const includedString =
          includedString$ instanceof Observable
            ? includedString$.value
            : includedString$;

        const includingStringIncludesIncludedString =
          includingString.indexOf(includedString) === 0;

        includingStringIncludesIncludedString$.value = includingStringIncludesIncludedString;
      });
    });
  return includingStringIncludesIncludedString$;
};

module.exports = {
  valueOf$,
  isObservable$,
  add$,
  subtract$,
  multiply$,
  divide$,
  choose$,
  cond$,
  eq$,
  and$,
  or$,
  not$,
  Number$,
  toFixed$,
  slice$,
  length$,
  map$,
  startsWith$,
};
