const {crawlPage} = require('./crawl.js')

async function main(){
    if(process.argv.length<3){
        console.log("No website provided!")
        process.exit(1)
    }

    if(process.argv.length>3){
        console.log("Too many command line args!")
        process.exit(1)
    }

    // for (const arg of process.argv){
    //     console.log(arg)
    //     // C:\Program Files\nodejs\node.exe -> name of programme
    //     // D:\WebCrawler\index.js -> entry point file
    //     // wagslane.dev -> cammand line argument
    // }

    const baseURL = process.argv[2]

    console.log(`Starting crawl of ${baseURL}`)
    const pages =  await crawlPage(baseURL, baseURL, {})
    //list all the links we crawled along with the number of times we crawled it.
    for (const page of Object.entries(pages)){
        console.log(page)
    }
}

main()