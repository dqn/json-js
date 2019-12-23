# json-parser

Original JSON parser.

## Installation

```sh
$ npm install dqn/json-parser
```

## Usage

```js
const { parse } = require('json-parser');

const obj = parse('{"foo":"bar","baz":42,"qux":{"quux":["corge",{"grault":"garply"},[23,"waldo"]]}}');
```
