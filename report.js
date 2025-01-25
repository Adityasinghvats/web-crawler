const fs = require('fs');
const filePath = "./reports/report.csv";

const saveReport = (report) => {
    fs.writeFile(filePath, report,(err) => {
        if (err) {
            console.error("Error writing to file", err);
        } else {
            console.log("Report saved successfully");
        }
    })
}

function printReport(pages){
    console.log("=============")
    console.log("REPORT")
    console.log("=============");
    const sortedPages = sortPages(pages); //get back decreasing sorted pages array
    let csvContent = "URL,Hits\n" //CSV Header
    for (const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page ${url}`)
        // saveReport(`Found ${hits} links to page ${url}`)
        //append so that we can make command separated value
        csvContent += `${url},${hits}\n`;
    }
    saveReport(csvContent)
    console.log("=============");
    console.log("END REPORT");
    console.log("=============");
}

function sortPages(pages){//sort on basis of how many times it was crawled
    const pagesArr = Object.entries(pages)
    pagesArr.sort((page1, page2) => {
        page1Hits = page1[1]
        page2Hits = page2[1]
        return page2[1] - page1[1] //greates to least
    }) 
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}