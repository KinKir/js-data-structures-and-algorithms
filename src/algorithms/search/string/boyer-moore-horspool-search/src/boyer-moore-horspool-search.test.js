import { boyerMooreHorspoolSearch } from './boyer-moore-horspool-search'

const showLogs = process.env.SHOW_LOGS === '1'

describe('boyerMooreHorspoolSearch', () => {
  it('handles a non-string needle argument', () => {
    expect(boyerMooreHorspoolSearch('search me', undefined, showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch('search me', null, showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch('search me', 42, showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch('search me', true, showLogs)).toBe(-1)
    expect(
      boyerMooreHorspoolSearch('search me', { someKey: 'someVal' }, showLogs)
    ).toBe(-1)
  })

  it('handles a non-string haystack argument', () => {
    expect(boyerMooreHorspoolSearch(undefined, 'find me', showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch(null, 'find me', showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch(42, 'find me', showLogs)).toBe(-1)
    expect(boyerMooreHorspoolSearch(true, 'find me', showLogs)).toBe(-1)
    expect(
      boyerMooreHorspoolSearch({ someKey: 'someVal' }, 'find me', showLogs)
    ).toBe(-1)
  })

  it('returns -1 if the string is not found', () => {
    expect(boyerMooreHorspoolSearch('blah', 'hey', showLogs)).toBe(-1)
  })

  it('returns -1 if the needle is longer than the haystack', () => {
    expect(
      boyerMooreHorspoolSearch(
        'small haystack',
        'really long needle to search for'
      )
    ).toBe(-1)
  })

  it('can correctly find a substring in a string with no spaces', () => {
    const haystack = 'abcdefghijklmnopqrstuvwxyz'
    const needle = 'ijk'
    expect(boyerMooreHorspoolSearch(haystack, needle)).toBe(8)
  })

  it('can correctly find a substring in a string with spaces', () => {
    const haystack = 'look at this nice short string'
    const needle = 'at'
    expect(boyerMooreHorspoolSearch(haystack, needle)).toBe(5)
  })

  it('returns the index of the first instance of the string found if there are duplicates', () => {
    const haystack = 'ababababababababab'
    const needle = 'ba'
    expect(boyerMooreHorspoolSearch(haystack, needle)).toBe(1)
  })
})
