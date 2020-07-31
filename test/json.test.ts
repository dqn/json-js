import { parse, stringify } from '../src/json';

describe('parse', () => {
  test('null', () => {
    const val = 'null';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('true', () => {
    const val = 'true';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('false', () => {
    const val = 'false';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('string', () => {
    const val = '"xxx"';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('number', () => {
    const val = '42';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('object', () => {
    const val = '{"xxx": "yyy", "yyy": "zzz"}';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('empty object', () => {
    const val = '{}';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('nested object', () => {
    const val = '{"xxx": {"yyy": {"zzz": null}}}';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('array', () => {
    const val = '[42, "xxx", {}, null]';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('empty array', () => {
    const val = '[]';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('nested array', () => {
    const val = '[[[null]]]';
    expect(parse(val)).toEqual(JSON.parse(val));
  });

  test('complex', () => {
    const act = parse(
      '{"foo":"bar","baz":42,"qux":{"quux":["corge",{"grault":"garply"},[23,"waldo",true,false,],null]}}',
    );
    const exp = {
      foo: 'bar',
      baz: 42,
      qux: { quux: ['corge', { grault: 'garply' }, [23, 'waldo', true, false], null] },
    };
    expect(act).toEqual(exp);
  });

  test('multiple line', () => {
    const val = `
{
  "xxx": {
    "yyy": {
      "zzz": null
    }
  }
}
`;
    expect(parse(val)).toEqual(JSON.parse(val));
  });
});

describe('stringify', () => {
  test('null', () => {
    const val = null;
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('true', () => {
    const val = true;
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('false', () => {
    const val = false;
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('string', () => {
    const val = 'xxx';
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('number', () => {
    const val = 42;
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('object', () => {
    const val = { xxx: 'yyy', yyy: 'zzz' };
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('empty object', () => {
    const val = {};
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('nested object', () => {
    const val = { xxx: { yyy: { zzz: null } } };
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('array', () => {
    const val = [42, 'xxx', {}, null];
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('empty array', () => {
    const val: undefined[] = [];
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('nested array', () => {
    const val = [[[null]]];
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });

  test('complex', () => {
    const val = {
      foo: 'bar',
      baz: 42,
      qux: { quux: ['corge', { grault: 'garply' }, [23, 'waldo', true, false], null] },
    };
    expect(stringify(val)).toEqual(JSON.stringify(val));
  });
});
