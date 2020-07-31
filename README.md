# json-js

[![npm version](https://img.shields.io/npm/v/@dqn/json-js.svg)](https://www.npmjs.com/package/@dqn/json-js)
[![build status](https://github.com/dqn/json-js/workflows/build/badge.svg)](https://github.com/dqn/json-js/actions)

Original pure JSON parser/stringifier.

## Installation

```sh
$ npm install @dqn/json-js
```

## Usage

```js
const { parse, stringify } = require('@dqn/json-js');

const obj = parse(
  '{"foo":"bar","baz":42,"qux":{"quux":["corge",{"grault":"garply"},[23,"waldo"]]}}',
);

const str = stringify({
  foo: 'bar',
  baz: 42,
  qux: { quux: ['corge', { grault: 'garply' }, [23, 'waldo']] },
});
```

## LICENSE

MIT
