//Dependencies
const Request = require("request")

//Variables
const Self_Args = process.argv.slice(2)

var Self = {}
Self.headers = [
    "x-original-url",
    "x-forwarded-host",
    "x-host",
    "x-forwarded-server",
    "x-forwarded-scheme"
]

//Main
if(!Self_Args.length){
    console.log("node index.js <url>")
    process.exit(url)
}

var header_index = 0

Check()
function Check(){
    if(header_index == Self.headers.length){
        console.log("Finished checking.")
        process.exit()
    }

    let options = {
        headers: {}
    }

    options.headers[Self.headers[header_index]] = "webcachepoison"

    Request(Self_Args[0], options, function(err, res, body){
        if(JSON.stringify(res.headers).indexOf("webcachepoison") != -1){
            console.log(`Website is vulnerable to website cache poisoning | ${Self.headers[header_index]}`)
            process.exit()
        }else{
            console.log(`Header ${Self.headers[header_index]} can't be poisoned.`)
        }

        header_index++
        Check()
    })
}
