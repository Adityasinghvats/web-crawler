const {normalizeURL, getURLsfromHTML} = require ('./crawl')
const {test , expect} = require('@jest/globals')

test('normalizeURL strip protocal',() => {
    const input = "https://github.com/Adityasinghvats/path/"
    const actual = normalizeURL(input)
    const expected = "github.com/Adityasinghvats/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash',() => {
    const input = "https://github.com/Adityasinghvats/path/"
    const actual = normalizeURL(input)
    const expected = "github.com/Adityasinghvats/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals',() => {
    const input = "https://Github.com/Adityasinghvats/path/"
    const actual = normalizeURL(input)
    const expected = "github.com/Adityasinghvats/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL protocol',() => {
    const input = "http://github.com/Adityasinghvats/path/"
    const actual = normalizeURL(input)
    const expected =  "github.com/Adityasinghvats/path"
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML absolute urls',() => {
    const inputHTML = `
    <html>
      <body>
        <a href="https://github.com/Adityasinghvats/path/">
        Github
        </a>
      </body>
    </html>  
    `
    const baseurl = "https://Github.com/Adityasinghvats/path/"
    const actual = getURLsfromHTML(inputHTML, baseurl)
    const expected = ["https://github.com/Adityasinghvats/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML relative urls',() => {
    const inputHTML = `
    <html>
      <body>
        <a href="/path/">
        Github
        </a>
      </body>
    </html>  
    `
    const baseurl = "https://github.com/Adityasinghvats"
    const actual = getURLsfromHTML(inputHTML, baseurl)
    const expected = ["https://github.com/Adityasinghvats/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML mixed urls',() => {
    const inputHTML = `
    <html>
      <body>
        <a href="https://github.com/Adityasinghvats/path1/">
        Github
        </a>
        <a href="/path2/">
        Github
        </a>
      </body>
    </html>  
    `
    const baseurl = "https://github.com/Adityasinghvats"
    const actual = getURLsfromHTML(inputHTML, baseurl)
    const expected = ["https://github.com/Adityasinghvats/path1/","https://github.com/Adityasinghvats/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML invalid urls',() => {
    const inputHTML = `
    <html>
      <body>
        <a href="invalid">
         Invalid Url
        </a>
      </body>
    </html>  
    `
    const baseurl = "https://github.com/Adityasinghvats"
    const actual = getURLsfromHTML(inputHTML, baseurl)
    const expected = []
    expect(actual).toEqual(expected)
})