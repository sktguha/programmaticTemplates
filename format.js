/**
 * search for = this.target or =this.target or = target or =target upwards
 * if we reach blank line means we reached top
 *   so o/p const { val } = this.target 1 after the blank line index
 * else if( reached any target){
 *     if( '{' char in same line means same line ){
 *         then add ,<space>high at end part
 *     } else( { char in different line) {
 *          then find how many spaces from start to word in prev line
 *          and add that + high, in the next line
 *     }
 * }
 *   
 */

const robot = require("robotjs");
const http = require('http');
const url = require('url');
const fs = require('fs');

// const queryObject = url.parse(req.url,true).query;
const path = '/Users/sguha/Projects/threat-canvas-backend/app/src/components/Home/index.js';// || queryObject.path;
// console.log(queryObject, req.url);
fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
        console.err(err.message);
        return;
    }
    const target = "state";
    const lineNo = 126;
    const targets = ["= this.state", "=this.state"];
    const high = "onChange";
    // console.log(data);
    const arr = data.split("\n"); //use os seperator
    const lc = lineNo;
    while (lc >= 0) {
        const line = arr[lc];
        if (targets.some(target => line.indexOf(target) !== -1)) {
            if (line.indexOf('}') !== -1) {

            }
            break;
        }
        lc--;
    }

});

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!');
    console.log(req.url);
}

const server = http.createServer(requestListener);
server.listen(9090);

