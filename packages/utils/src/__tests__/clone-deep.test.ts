import { describe, it, expect } from 'vitest';
import { cloneDeep } from '../clone-deep';

describe('test cloneDeep', () => {
  it('match leaf', () => {
    const src = {
      a: [
        {
          c: 1,
        },
        {
          d: [
            {
              e: 'abc',
              f: {
                g: 3,
              },
            },
          ],
        },
      ],
    };
    const dst = cloneDeep(src);
    expect(dst.a[1].d[0].f.g).toEqual(3);
    expect(dst.a[1].d[0].e).toBe('abc');
  });
});
