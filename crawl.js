const {JSDOM} = require('jsdom')

async function crawlPage(baseURL,currentURL,pages){

    const baseURLobj = new URL(baseURL)
    const currentURLobj = new URL(currentURL)

    if(baseURLobj.hostname !== currentURLobj.hostname){
        return pages//in case current url does not belong to same link as home
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL]>0){//if i have already seen this page
        pages[normalizedCurrentURL]++ //increment the number of time I have seen this page
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`Actively crawling ${currentURL}`)

    try {
        const res = await fetch(currentURL)
        //response body is expected as html so we parse it to html
        if( res.status > 399){
            console.log(`Error in fetch with status code: ${res.status} on page :${currentURL}`)
            return pages
        }
        const contentType = res.headers.get('content-type')
        if(!contentType.includes("text/html")){
            console.log(`Non HTML code found on page :${currentURL}`)
            return pages
        }
        const htmlBody = await res.text()
        const nextURLs = getURLsfromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs){
            //recursively crawl all links of webpage
            //until we have crawled all the links or we
            //find some external links
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`Error in fetch: ${error.message}, on page: ${currentURL}`)
    }
    return pages
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
                console.log(`Error relative ${err.message}`)
            }
            
        }else{
            //absolute
            try{
                const urlObj = new URL(linkElement)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`Error absolute ${err.message}`)
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