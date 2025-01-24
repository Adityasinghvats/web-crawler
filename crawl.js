const {JSDOM} = require('jsdom')

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
    getURLsfromHTML
}