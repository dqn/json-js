const SPACE_REGEXP = /\s/g;
const NUMBER_REGEXP = /\d/;

type JsonValue = null | string | number | boolean | { [key: string]: JsonValue } | JsonValue[];

class Parser {
  chars: string[] = [];

  constructor(text: string) {
    this.chars = text.replace(SPACE_REGEXP, '').split('');
  }

  next(expect: string | RegExp) {
    if (typeof expect === 'object') {
      return expect.test(this.chars[0]);
    } else if (typeof expect === 'string') {
      return this.chars[0] === expect;
    }
  }

  shift(): string | undefined {
    return this.chars.shift();
  }

  consume(expect: string) {
    for (const c of expect) {
      if (!this.next(c)) {
        throw new Error(`expect "${c}", but got "${this.chars[0]}"`);
      }
      this.shift();
    }
  }

  parseObject(): { [key: string]: JsonValue } {
    this.consume('{');

    const obj: { [key: string]: JsonValue } = {};

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

  parseArray(): JsonValue[] {
    this.consume('[');

    const arr: JsonValue = [];

    while (!this.next(']')) {
      arr.push(this.parse());

      if (this.next(',')) {
        this.shift();
      }
    }

    this.consume(']');

    return arr;
  }

  parseString(): string {
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

  parseNumber(): number {
    let str = '';

    while (this.next(NUMBER_REGEXP)) {
      str += this.shift();
    }

    return Number(str);
  }

  parseTrue(): true {
    this.consume('true');
    return true;
  }

  parseFalse(): false {
    this.consume('false');
    return false;
  }

  parseNull(): null {
    this.consume('null');
    return null;
  }

  parse(): any {
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
      throw new Error(`failed to parse the JSON`);
    }
  }
}

export function parse(text: string) {
  return new Parser(text).parse();
}
