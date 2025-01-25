const {sortPages} = require ('./report')
const {test , expect} = require('@jest/globals')

test('sort pages',() => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sort some pages',() => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 4,
        'https://wagslane.dev/path3': 10,
        'https://wagslane.dev/path4': 5,
        'https://wagslane.dev/path5': 16,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path5', 16],
        ['https://wagslane.dev/path3', 10],
        ['https://wagslane.dev/path4', 5],
        ['https://wagslane.dev/path2', 4],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1],
    ]
    expect(actual).toEqual(expected)
})