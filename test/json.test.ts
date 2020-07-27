import { parse } from '../src/json';

describe('parse', () => {
  test('', () => {
    const act = parse(
      '{"foo":"bar","baz":42,"qux":{"quux":["corge",{"grault":"garply"},[23,"waldo"]]}}',
    );
    const exp = {
      foo: 'bar',
      baz: 42,
      qux: { quux: ['corge', { grault: 'garply' }, [23, 'waldo']] },
    };
    expect(act).toEqual(exp);
  });
});
