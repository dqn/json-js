'use strict';

const SPACE_REGEXP = /\s/g;
const NUMBER_REGEXP = /\d/;

class Parser {
  constructor(jsonString) {
    this.jsonString = jsonString;
    this.chars = jsonString.replace(SPACE_REGEXP, '').split('');
  }

  next(expect) {
    if (typeof expect === 'object') {
      return expect.test(this.chars[0]);
    } else if (typeof expect === 'string') {
      return this.chars[0] === expect;
    }
  }

  shift() {
    return this.chars.shift();
  }

  consume(expect) {
    for (const c of expect) {
      if (!this.next(c)) {
        throw new Error(`expect "${c}", but got "${this.chars[0]}"`);
      }
      this.shift();
    }
  }

  parseObject() {
    this.consume('{');

    const obj = {};

    while (!this.next('}')) {
      const key = this.parseString();
      this.consume(':');
      obj[key] = this.parse();

      if (this.next(',')) {
        this.shift();
      }
    }

    this.consume('}');

    return obj;
  }

  parseArray() {
    this.consume('[');

    const arr = [];

    while (!this.next(']')) {
      arr.push(this.parse());

      if (this.next(',')) {
        this.shift();
      }
    }

    this.consume(']');

    return arr;
  }

  parseString() {
    this.consume('"');

    let str = '';
    let skipNext = false;

    // TODO: escape
    while (!this.next('"')) {
      str += this.shift();

      if (this.next('\\')) {
        str += this.shift();
      }
    }

    this.consume('"');

    return str;
  }

  parseNumber() {
    let str = '';

    while (this.next(NUMBER_REGEXP)) {
      str += this.shift();
    }

    return Number(str);
  }

  parseTrue() {
    this.consume('true');
    return true;
  }

  parseFalse() {
    this.consume('false');
    return false;
  }

  parseNull() {
    this.consume('null');
    return null;
  }

  parse() {
    if (this.next('{')) {
      return this.parseObject();
    } else if (this.next('[')) {
      return this.parseArray();
    } else if (this.next('"')) {
      return this.parseString();
    } else if (this.next(NUMBER_REGEXP)) {
      return this.parseNumber();
    } else if (this.next('t')) {
      return this.parseTrue();
    } else if (this.next('f')) {
      return this.parseFalse();
    } else if (this.next('n')) {
      return this.parseNull();
    } else {
      throw new Error(`could not parse ${this.jsonString}`);
    }
  }
}

function parse(jsonString) {
  return new Parser(jsonString).parse();
}

module.exports = {
  parse,
};
