/**
 * Checks if the expression has an opening and closing parenthesis
 * @param {string} expression
 */
const isExpression = (expression) => {
  if (expression.length < 2) return false;
  if (expression.charAt(0) !== '(') return false;
  if (expression.slice(-1) !== ')') return false;
  return true;
};

/**
 * Removes the first and the last character from an expression.
 * It is assumed that these those characters are parentheses.
 * @param {string} expression
 */
const trimParentheses = (expression) => expression.slice(1, -1);

/**
 * Removes the first and the last character from an expression.
 * It is assumed that these those characters are singleQuotes.
 * @param {string} expression
 */
const trimSingleQuotes = (expression) => expression.slice(1, -1);

/**
 * Removes the first and the last character from an expression.
 * It is assumed that these those characters are square brackets.
 * @param {string} expression
 */
const trimSquareBrackets = (expression) => expression.slice(1, -1);

/**
 * Removes the first and the last character from an expression.
 * It is assumed that these those characters are curly brackets.
 * @param {string} expression
 */
const trimCurlyBrackets = (expression) => expression.slice(1, -1);

/**
 * Checks if the expression has an opening and closing single quote
 * @param {string} expression
 */
const isString = (expression) => {
  if (expression.length < 2) return false;
  if (expression.charAt(0) !== "'") return false;
  if (expression.slice(-1) !== "'") return false;
  return true;
};

/**
 * Checks if the expression has an opening and opening and closing square bracket
 * @param {string} expression
 */
const isArray = (expression) => {
  if (expression.length < 2) return false;
  if (expression.charAt(0) !== '[') return false;
  if (expression.slice(-1) !== ']') return false;
  return true;
};

/**
 * Checks if the expression has an opening and opening and closing curly bracket
 * @param {string} expression
 */
const isObject = (expression) => {
  if (expression.length < 2) return false;
  if (expression.charAt(0) !== '{') return false;
  if (expression.slice(-1) !== '}') return false;
  return true;
};

/**
 * Checks if the expression can be interpreted as a number
 * @param {string} expression
 */
const isNumber = (expression) => !isNaN(Number(expression));

/**
 * Checks if the expression is a valid name to be bound to a value
 * @param {string} expression
 */
const isWord = (expression) => true; // TODO: Define what is a valid name of a value

/**
 * Checks if the expression is a boolean
 * @param {string} expression
 */
const isBoolean = (expression) =>
  expression === 'true' || expression === 'false';

/**
 * Checks if the token is a valid keyword, i.e. starts with a colon
 * @param {string} token
 */
const isKeyword = (token) =>
  token.charAt(0) === ':' && !token.slice(1).includes(':');

/**
 * Removes the colon from the start of the keyword
 * Assumes that the keyword is a valid keyword, i.e. starts with a colon
 * @param {string} token
 */
const removeColonFromKeyword = (keyword) => {
  if (!isKeyword(keyword)) {
    throw SyntaxError(`A keyword must be preceded by a colon: ${keyword}`);
  }
  return keyword.slice(1);
};

/**
 * Checks if the expression is a boolean
 * @param {'true' | 'false'} expression
 */
const parseBoolean = (expression) => (expression === 'true' ? true : false);

/**
 * Takes a string of one or more expressions and splits it into tokens at
 * whitespaces which are not inside strings nor parentheses
 * @param {string} expression
 * @returns {string[]}
 */
const getTokens = (expression) => {
  word = '';
  parenthesesCount = 0;
  squareBracketCount = 0;
  curlyBracketCount = 0;
  isInsideString = false;
  expression.split('').forEach((char) => {
    if (char === '(' && !isInsideString) {
      parenthesesCount++;
      word += '(';
      return;
    }
    if (char === '[' && !isInsideString) {
      squareBracketCount++;
      word += '[';
      return;
    }
    if (char === '{' && !isInsideString) {
      curlyBracketCount++;
      word += '{';
      return;
    }
    if (char === ')' && !isInsideString) {
      parenthesesCount--;
      word += ')';
      return;
    }
    if (char === ']' && !isInsideString) {
      squareBracketCount--;
      word += ']';
      return;
    }
    if (char === '}' && !isInsideString) {
      curlyBracketCount--;
      word += '}';
      return;
    }
    if (char === "'") {
      isInsideString = !isInsideString;
      word += "'";
      return;
    }
    if (char === ' ') {
      word +=
        isInsideString ||
        parenthesesCount ||
        squareBracketCount ||
        curlyBracketCount
          ? ' '
          : String.fromCharCode(28);
      return;
    }
    word += char;
  });
  return word.split(String.fromCharCode(28)).filter((token) => token !== '');
};

const parseExpression = (expression) => {
  // An expression is either a value, or an expression which has to be parsed
  const trimmedExpression = expression.trim();
  if (isExpression(trimmedExpression)) {
    const tokens = getTokens(trimParentheses(trimmedExpression));
    const [operatorToken, ...argTokens] = tokens;
    return {
      tokenType: 'apply',
      operator: parseExpression(operatorToken),
      args: argTokens.map(parseExpression),
    };
  }
  if (isArray(trimmedExpression)) {
    return {
      tokenType: 'array',
      values: getTokens(trimSquareBrackets(trimmedExpression)).map(
        parseExpression
      ),
    };
  }
  if (isObject(trimmedExpression)) {
    const tokens = getTokens(trimCurlyBrackets(trimmedExpression));
    const keywords = tokens.filter((_, i) => i % 2 === 0).map(parseExpression);
    const values = tokens.filter((_, i) => i % 2 !== 0).map(parseExpression);
    if (keywords.length !== values.length) {
      throw SyntaxError(
        `There number of keys in an object must be equal to the number of values: ${trimmedExpression}`
      );
    }
    return {
      tokenType: 'object',
      keywords,
      values,
    };
  }
  // It is not an expression, so it is a list of one or more things
  const tokens = getTokens(trimmedExpression);
  if (!tokens.length) {
    throw SyntaxError(`Empty expression: ${trimmedExpression}`);
  }
  // An expression can never have more than one tokens which are not wrapped in parentheses
  if (tokens.length > 1) {
    throw SyntaxError(
      `Multiple expressions must be wrapped in parentheses: ${trimmedExpression}`
    );
  }
  const token = tokens[0];
  // TODO: If it is a word, look up the syntax tree to find the value
  if (isString(token)) {
    return {
      tokenType: 'value',
      dataType: 'string',
      value: trimSingleQuotes(token),
    };
  }
  if (isNumber(token)) {
    return {
      tokenType: 'value',
      dataType: 'number',
      value: Number(token),
    };
  }
  if (isBoolean(token)) {
    return {
      tokenType: 'value',
      dataType: 'boolean',
      value: parseBoolean(token),
    };
  }
  if (isKeyword(token)) {
    return {
      tokenType: 'keyword',
      // TODO: All keywords should have a dataType
      value: token,
    };
  }
  if (isWord(token)) {
    return {
      tokenType: 'word',
      // TODO: All words should have a dataType
      word: token,
    };
  }
};

const specialForms = {
  define: {
    tokenType: 'function',
    function: (args, scope) => {
      if (args.length !== 2) {
        throw SyntaxError(
          `${args.length} arguments passed to define. Expected 2`
        );
      }
      if (args[0].tokenType !== 'word') {
        throw SyntaxError(
          `An argument of type ${args[0].tokenType} was passed to define. Expected a word.`
        );
      }
      const value = evaluateSyntaxTree(args[1], scope);
      const word = args[0].word;
      scope[word] = value;
      return value;
    },
  },
  do: {
    tokenType: 'function',
    function: (args, scope) => {
      let value = false;
      for (let arg of args) {
        value = evaluateSyntaxTree(arg, scope);
      }
      return value;
    },
  },
  fun: {
    tokenType: 'function',
    function: (args, scope) => {
      if (!args.length) {
        throw SyntaxError(
          'No arguments were passed to fun. Expected at least a one.'
        );
      }
      const body = args.slice(-1)[0];
      const params = args.slice(0, -1).map((arg) => {
        if (arg.tokenType !== 'word') {
          throw SyntaxError(
            `Function parameters must be words, not ${param.tokenType}`
          );
        }
        return arg.word;
      });
      return {
        tokenType: 'function',
        function: (...arguments) => {
          if (arguments.length !== params.length) {
            throw TypeError(
              `${arguments.length} arguments were passed to anonymous function. Expected ${params.length}.`
            );
          }
          const localScope = Object.assign({}, scope);
          arguments.forEach((argument, i) => {
            localScope[params[i]] = argument;
          });
          return evaluateSyntaxTree(body, localScope);
        },
      };
    },
  },
  if: {
    tokenType: 'function',
    function: (args, scope) => {
      if (args.length !== 3) {
        throw SyntaxError(
          `${args.length} arguments were passed to if. Expected 3.`
        );
      }
      const condition = evaluateSyntaxTree(args[0], scope);
      if (condition.value === true) {
        return evaluateSyntaxTree(args[1], scope);
      }
      if (condition.value === false) {
        return evaluateSyntaxTree(args[2], scope);
      }
      throw TypeError(
        `The first argument of if should be a boolean (true or false). Received ${condition.value}, which is of type ${condition.type}.`
      );
    },
  },
};
const core = {
  '+': {
    tokenType: 'function',
    function: (...args) => {
      if (!args.every((arg) => arg.dataType === 'number')) {
        throw TypeError(
          `All arguments passed to + must be of type number. ${args
            .filter((arg) => arg.dataType !== 'number')
            .map((arg) => arg.value)
            .join(', ')} are not of type number.`
        );
      }
      if (args.length === 1) {
        return args[0];
      }
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.reduce((a, b) => a.value + b.value),
      };
    },
  },
  '-': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      if (args.length === 1) {
        return {
          tokenType: 'value',
          dataType: 'number',
          value: -args[0].value,
        };
      }
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.reduce((a, b) => a.value - b.value),
      };
    },
  },
  '*': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      if (args.length === 1) {
        return {
          tokenType: 'value',
          dataType: 'number',
          value: 1 / args[0].value,
        };
      }
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.reduce((a, b) => a.value * b.value),
      };
    },
  },
  '/': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.reduce((a, b) => a.value / b.value),
      };
    },
  },
  '>': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.every((arg, i) => i === 0 || args[i - 1].value > arg.value),
      };
    },
  },
  '<': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.every((arg, i) => i === 0 || args[i - 1].value < arg.value),
      };
    },
  },
  '=': {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: args.every((arg, i) => arg.value === args[0].value),
      };
    },
  },
  '|>': {
    tokenType: 'function',
    function: (...args) => {
      const startValue = args[0];
      return args
        .slice(1)
        .reduce((aggregator, fn) => fn.function(aggregator), startValue);
    },
  },
  abs: {
    tokenType: 'function',
    function: (arg) => {
      return {
        tokenType: 'value',
        dataType: 'number',
        value: Math.abs(arg.value),
      };
    },
  },
  concat: {
    tokenType: 'function',
    function: (...args) => {
      if (args.length === 1) {
        return args[0];
      }
      return {
        tokenType: 'array',
        values: args[0].values.concat(...args.map(({ values }) => values)),
      };
    },
  },
  'even?': {
    tokenType: 'function',
    function: (number) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: number.value % 2 === 0,
      };
    },
  },
  keys: {
    tokenType: 'function',
    function: (arg) => {
      if (arg.tokenType === 'object') {
        return {
          tokenType: 'array',
          values: arg.keywords,
        };
      }
      if (arg.tokenType === 'array') {
        // Here I don't use arg because I want to return the indices as numbers
        // because get is very strict and requires that arrays are accessed by
        // an index which is a number.
        return {
          tokenType: 'array',
          values: arg.values.map((_, i) => ({
            tokenType: 'value',
            dataType: 'number',
            value: i,
          })),
        };
      }
    },
  },
  length: {
    tokenType: 'function',
    function: (array) => {
      return {
        tokenType: 'value',
        dataType: 'number',
        value: array.values.length,
      };
    },
  },
  'odd?': {
    tokenType: 'function',
    function: (number) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: number.value % 2 !== 0,
      };
    },
  },
  'to-string': {
    tokenType: 'function',
    function: (token) => {
      // TODO: Stringify functions
      if (token.dataType === 'string') return token.value;
      if (token.dataType === 'number') return `${token.value}`;
      if (token.tokenType === 'keyword') return token.value;
      if (token.tokenType === 'array')
        return `[ ${token.values.map(core['to-string'].function).join(' ')} ]`;
      if (token.tokenType === 'object')
        return `{ ${token.keywords
          .map(
            (keyword, i) =>
              `${core['to-string'].function(keyword)} ${core[
                'to-string'
              ].function(token.values[i])}`
          )
          .join(' ')} }`;
    },
  },
  str: {
    tokenType: 'function',
    function: (...args) => {
      return {
        tokenType: 'value',
        dataType: 'string',
        value: args.map(core['to-string'].function).join(''),
      };
    },
  },
  keyword: {
    tokenType: 'function',
    function: (key) => {
      if (key.tokenType === 'keyword') {
        return key;
      }
      if (key.tokenType === 'value') {
        return {
          tokenType: 'keyword',
          value: `:${key.value}`,
        };
      }
      throw TypeError(
        `The keyword function is only applicable for keywords, numbers and strings.Keyword was called with ${core[
          'to-string'
        ].function(key)}`
      );
    },
  },
  entries: {
    tokenType: 'function',
    function: (arg) => {
      if (arg.tokenType === 'object') {
        return {
          tokenType: 'array',
          values: arg.keywords.map((keyword, i) => ({
            tokenType: 'array',
            values: [keyword, arg.values[i]],
          })),
        };
      }
      if (arg.tokenType === 'array') {
        // Here I don't use arg because I want to return the indices as numbers
        // because get is very strict and requires that arrays are accessed by
        // an index which is a number.
        return {
          tokenType: 'array',
          values: arg.values.map((value, i) => ({
            tokenType: 'array',
            values: [
              { tokenType: 'value', dataType: 'number', value: i },
              value,
            ],
          })),
        };
      }
    },
  },
  'from-entries': {
    tokenType: 'function',
    function: (entries) => {
      return {
        tokenType: 'object',
        keywords: entries.values.map((entry) =>
          core.keyword.function(entry.values[0])
        ),
        values: entries.values.map((entry) => entry.values[1]),
        keywordToToken: Object.fromEntries(
          entries.values.map((entry) => [
            entry.values[0].value,
            entry.values[1].value,
          ])
        ),
      };
    },
  },
  get: {
    tokenType: 'function',
    function: (...args) => {
      if (args[0].tokenType === 'object') {
        if (args[1].tokenType !== 'keyword') {
          throw TypeError(
            `When accessing a value in an object, the second argument passed to get must be a keyword. ${args[1].value} is not a keyword.`
          );
        }
        return args[0].keywordToToken[args[1].value];
      }
      if (args[0].tokenType === 'array') {
        if (args[1].dataType !== 'number') {
          throw TypeError(
            `When accessing a value in an array, the second argument passed to get must be a number. ${args[1].value} is not a number.`
          );
        }
        return args[0].values[args[1].value];
      }
      throw TypeError(
        `Get can only be used to access values on objects or arrays. Tried to access value on ${core[
          'to-string'
        ].function(args[0])} (${args[0].tokenType})`
      );
    },
  },
  map: {
    tokenType: 'function',
    function: (fn, array) => {
      return {
        tokenType: 'array',
        values: array.values.map((item) => fn.function(item)),
      };
    },
  },
  filter: {
    tokenType: 'function',
    function: (fn, array) => {
      return {
        tokenType: 'array',
        values: array.values.filter((item) => fn.function(item)),
      };
    },
  },
  max: {
    tokenType: 'function',
    function: (...args) => {
      // TODO: Add type validation
      return {
        tokenType: 'value',
        dataType: 'number',
        value: Math.max(...args.map(({ value }) => value)),
      };
    },
  },
  // | (fn, array) => any
  // | (fn, initialValue, array) => any
  // ( initialValue is the middle argument to always have data as last argument
  //   to facilitate currying with partial)
  reduce: {
    tokenType: 'function',
    function: (...args) => {
      if (args.length === 2) {
        const fn = args[0];
        const array = args[1];
        return array.values.reduce((accumulator, item) =>
          fn.function(accumulator, item)
        );
      }
      if (args.length === 3) {
        const fn = args[0];
        const initialValue = args[1];
        const array = args[2];
        return array.values.reduce(
          (accumulator, item) => fn.function(accumulator, item),
          initialValue
        );
      }
      throw SyntaxError(
        `${args.length} arguments were passed to reduce. Expected 2 or 3.`
      );
    },
  },
  slice: {
    tokenType: 'function',
    function: (...args) => {
      if (args.length === 1) {
        const array = args[0].values;
        return {
          tokenType: 'array',
          values: array.slice(),
        };
      }
      if (args.length === 2) {
        const start = args[0].value;
        const array = args[1].values;
        return {
          tokenType: 'array',
          values: array.slice(start),
        };
      }
      if (args.length === 3) {
        const start = args[0].value;
        const end = args[1].value;
        const array = args[2].values;
        return {
          tokenType: 'array',
          values: array.slice(start, end),
        };
      }
      throw SyntaxError(
        `${args.length} arguments were passed to slice. Expected 1, 2 or 3.`
      );
    },
  },
  print: {
    tokenType: 'function',
    function: (...args) => {
      if (args.length !== 1) {
        throw SyntaxError(
          `${args.length} arguments were passed to if. Expected 1.`
        );
      }
      // Don't remove this console log. It's intended to be here
      console.log(core['to-string'].function(args[0]));
      return args[0];
    },
  },
  values: {
    tokenType: 'function',
    function: (arg) => {
      if (arg.tokenType === 'object') {
        return {
          tokenType: 'array',
          values: arg.values,
        };
      }
      throw TypeError(
        `The values function is only applicable to objects. ${core[
          'to-string'
        ].function(
          arg
        )} is not a object. It does not make sense to apply it to an array, for instance, as that would just return an identical array.`
      );
    },
  },
};
const evaluateSyntaxTree = (syntaxTree, scope) => {
  if (syntaxTree.tokenType === 'value') {
    return syntaxTree;
  }
  if (syntaxTree.tokenType === 'keyword') {
    return syntaxTree;
  }
  if (syntaxTree.tokenType === 'array') {
    return {
      tokenType: 'array',
      values: syntaxTree.values.map((arg) => evaluateSyntaxTree(arg, scope)),
    };
  }
  if (syntaxTree.tokenType === 'object') {
    const keywords = syntaxTree.keywords.map((keywordSyntaxTree) =>
      evaluateSyntaxTree(keywordSyntaxTree, scope)
    );
    const malformedKeywords = keywords.filter(
      (keyword) => keyword.tokenType !== 'keyword'
    );
    if (malformedKeywords.length) {
      throw SyntaxError(
        `Malformed keywords: ${malformedKeywords
          .map((keyword) => keyword.value)
          .join(', ')} are not valid keywords.`
      );
    }
    const values = syntaxTree.values.map((valueSyntaxTree) =>
      evaluateSyntaxTree(valueSyntaxTree, scope)
    );
    return {
      tokenType: 'object',
      keywordToToken: Object.fromEntries(
        keywords.map((keyword, i) => [keyword.value, values[i]])
      ),
      keywords,
      values,
    };
  }
  if (syntaxTree.tokenType === 'word') {
    if (scope.hasOwnProperty(syntaxTree.word)) {
      return scope[syntaxTree.word];
    }
    throw ReferenceError(`${syntaxTree.word} is not defined.`);
  }
  if (syntaxTree.tokenType === 'apply') {
    const { operator, args } = syntaxTree;
    if (
      operator.tokenType === 'word' &&
      specialForms.hasOwnProperty(operator.word)
    ) {
      return specialForms[operator.word].function(args, scope);
    }
    const evaluatedOperator = evaluateSyntaxTree(operator, scope);
    if (evaluatedOperator.tokenType === 'function') {
      return evaluatedOperator.function(
        ...args.map((arg) => evaluateSyntaxTree(arg, scope))
      );
    }
    throw TypeError('Cannot apply a non-function.');
  }
};

const convertFromJavaScriptValue = (javaScriptValue) => {
  if (javaScriptValue === null || javaScriptValue === undefined) {
    return {
      tokenType: 'value',
      dataType: 'number',
      value: 0,
    };
  }
  if (typeof javaScriptValue === 'string') {
    return {
      tokenType: 'value',
      dataType: 'string',
      value: javaScriptValue,
    };
  }
  if (typeof javaScriptValue === 'number') {
    return {
      tokenType: 'value',
      dataType: 'number',
      value: javaScriptValue,
    };
  }
  if (typeof javaScriptValue === 'boolean') {
    return {
      tokenType: 'value',
      dataType: 'boolean',
      value: javaScriptValue,
    };
  }
  if (typeof javaScriptValue === 'object' && Array.isArray(javaScriptValue)) {
    return {
      tokenType: 'array',
      values: javaScriptValue.map(convertFromJavaScriptValue),
    };
  }
  if (typeof javaScriptValue === 'object') {
    const keywords = Object.keys(javaScriptValue).map((key) => ({
      tokenType: 'keyword',
      value: `:${key}`,
    }));
    const values = Object.values(javaScriptValue).map(
      convertFromJavaScriptValue
    );
    return {
      tokenType: 'object',
      keywords,
      keywordToToken: Object.fromEntries(
        keywords.map((keyword, i) => [keyword.value, values[i]])
      ),
      values,
    };
  }
  throw TypeError(
    `Only data of type string, number, boolean, array or object can be converted from JavaScript. ${javaScriptValue} is of type ${typeof javaScriptValue}.`
  );
};

const callWithJavaScriptArguments = (codeString, ...javaScriptArguments) => {
  return convertToJavaScriptValue(
    evaluateSyntaxTree(
      {
        tokenType: 'apply',
        operator: parseExpression(codeString),
        args: javaScriptArguments.map(convertFromJavaScriptValue),
      },
      core
    )
  );
};

const convertToJavaScriptValue = (syntaxTree) => {
  if (syntaxTree.tokenType === 'value') {
    return syntaxTree.value;
  }
  if (syntaxTree.tokenType === 'array') {
    return syntaxTree.values.map((arg) => convertToJavaScriptValue(arg));
  }
  if (syntaxTree.tokenType === 'object') {
    const { keywords, values } = syntaxTree;
    const entries = keywords.map((keyword, i) => {
      const valueSyntaxTree = values[i];
      const value = convertToJavaScriptValue(valueSyntaxTree);
      return [removeColonFromKeyword(keyword.value), value];
    });
    return Object.fromEntries(entries);
  }
  if (syntaxTree.tokenType === 'keyword') {
    return syntaxTree.value;
  }
};

const evaluate = (expression) =>
  convertToJavaScriptValue(
    evaluateSyntaxTree(parseExpression(expression), { ...core }) // I need to destructure core so that modifications to the scope here do not persist when using it in a new evaluation
  );

module.exports = { callWithJavaScriptArguments };
