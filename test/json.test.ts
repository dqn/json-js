import { parse } from '../src/json';

describe('parse', () => {
  test('null', () => {
    expect(parse('null')).toEqual(null);
  });

  test('true', () => {
    expect(parse('true')).toEqual(true);
  });

  test('false', () => {
    expect(parse('false')).toEqual(false);
  });

  test('string', () => {
    expect(parse('"xxx"')).toEqual('xxx');
  });

  test('number', () => {
    expect(parse('42')).toEqual(42);
  });

  test('object', () => {
    expect(parse('{"xxx": "yyy", "yyy": "zzz"}')).toEqual({ xxx: 'yyy', yyy: 'zzz' });
  });

  test('empty object', () => {
    expect(parse('{}')).toEqual({});
  });

  test('nested object', () => {
    expect(parse('{"xxx": {"yyy": {"zzz": null}}}')).toEqual({ xxx: { yyy: { zzz: null } } });
  });

  test('array', () => {
    expect(parse('[42, "xxx", {}, null]')).toEqual([42, 'xxx', {}, null]);
  });

  test('empty array', () => {
    expect(parse('[]')).toEqual([]);
  });

  test('nested array', () => {
    expect(parse('[[[null]]]')).toEqual([[[null]]]);
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
    const text = `
{
  "xxx": {
    "yyy": {
      "zzz": null
    }
  }
}
`;
    expect(parse(text)).toEqual({ xxx: { yyy: { zzz: null } } });
  });
});
