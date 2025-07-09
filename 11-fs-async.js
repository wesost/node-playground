const {readFile, writeFile} = require('fs') // use destructuing
readFile('./content/first.txt', 'utf8', (err, result)=> {
    if (err){
        console.log(err)
        return
    }
    const first = result
    readFile('./content/second.txt', 'utf8', (err, result)=> {
        if (err) {
            console.log(err)
            return
        }
        const second = result
        writeFile('./content/result-async.txt', 
            `heres the res: ${first}, plus second: ${second}`,
            (err, result)=>{
                if(err){
                    console.log(err)
                    return
                }
                console.log(result)
            }
        )
    })

})
