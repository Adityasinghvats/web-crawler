# Web-crawler

This is a project which mimics the web crawlers used in large browser engines like Chromium and Gecko.

## Description

This web crawler is designed to crawl web pages starting from a base URL, collect links, and generate a report of the pages it has visited and the number of times each page was found. It is built using Node.js and demonstrates basic web crawling and reporting functionalities.

## Features

- Crawl web pages and collect links
- Normalize URLs
- Handle both absolute and relative URLs
- Generate a report of crawled pages and their hit counts
- Unit tests for core functionalities using Jest
- Ability to create report in CSV format for usage in excel or python parsing.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Adityasinghvats/web-crawler.git
    ```
2. Navigate to the project directory:
    ```sh
    cd webcrawler
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the web crawler, run the following command:
```sh
npm start <any url of your choice>
