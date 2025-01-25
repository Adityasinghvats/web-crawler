const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Actively crawling ${currentURL}`)

    try {
        const res = await fetch(currentURL)
        //response body is expected as html so we parse it to html
        const resText = await res.text()
        console.log(resText)
    } catch (error) {
        console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

function getURLsfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody) //creates a in memory copy of DOM
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        // console.log(linkElement.href)
        if(linkElement.href.slice(0, 1) === '/'){
            //relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`Error ${err.message}`)
            }
            
        }else{
            //absolute
            try{
                const urlObj = new URL(linkElement)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`Error ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)   
    const hostpath =  `${urlObj.hostname}${urlObj.pathname}`
    if (hostpath.length >0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0, -1) //everything except last char
    }
    return hostpath
}

module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}