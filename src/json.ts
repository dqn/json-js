type JsonValue = null | string | number | boolean | { [key: string]: JsonValue } | JsonValue[];

export function parse(text: string): any {
  const chars = text.replace(/\s/g, '').split('');

  const next = (expect: string | RegExp): boolean => {
    if (typeof expect === 'object') {
      return expect.test(chars[0]);
    } else if (typeof expect === 'string') {
      return chars[0] === expect;
    }
    throw TypeError(`unknown argument type: ${typeof expect}`);
  };

  const shift = (): string | undefined => {
    return chars.shift();
  };

  const consume = (expect: string) => {
    for (const c of expect) {
      if (!next(c)) {
        throw new Error(`expect "${c}", but got "${chars[0]}"`);
      }
      shift();
    }
  };

  const parseObject = (): { [key: string]: JsonValue } => {
    consume('{');

    const obj: { [key: string]: JsonValue } = {};

    while (!next('}')) {
      const key = parseString();
      consume(':');
      obj[key] = _parse();

      if (next(',')) {
        shift();
      }
    }

    consume('}');

    return obj;
  };

  const parseArray = (): JsonValue[] => {
    consume('[');

    const arr: JsonValue = [];

    while (!next(']')) {
      arr.push(_parse());

      if (next(',')) {
        shift();
      }
    }

    consume(']');

    return arr;
  };

  const parseString = (): string => {
    consume('"');

    let str = '';
    let skipNext = false;

    // TODO: escape
    while (!next('"')) {
      str += shift();

      if (next('\\')) {
        str += shift();
      }
    }

    consume('"');

    return str;
  };

  const parseNumber = (): number => {
    let str = '';

    while (next(/\d/)) {
      str += shift();
    }

    return Number(str);
  };

  const parseTrue = (): true => {
    consume('true');
    return true;
  };

  const parseFalse = (): false => {
    consume('false');
    return false;
  };

  const parseNull = (): null => {
    consume('null');
    return null;
  };

  const _parse = (): any => {
    if (next('{')) {
      return parseObject();
    } else if (next('[')) {
      return parseArray();
    } else if (next('"')) {
      return parseString();
    } else if (next(/\d/)) {
      return parseNumber();
    } else if (next('t')) {
      return parseTrue();
    } else if (next('f')) {
      return parseFalse();
    } else if (next('n')) {
      return parseNull();
    } else {
      throw new Error(`failed to parse the JSON`);
    }
  };

  return _parse();
}
