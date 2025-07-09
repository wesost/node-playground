const {readFileSync, writeFileSync} = require('fs'); // use destructuing
// const fs = require('fs')
// fs.readFileSync // does same same as line 1

const first = readFileSync('./content/first.txt', 'utf8') // read text from files, need path and encoding as args
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync( // path to result file, content, flag to append
    './content/result.txt',
    `here's the result: ${first} and add second here: ${second}`,
    {flag: 'a'}
)