const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res)=>{
console.log(req.url,req.method);
// set header content type 
res.setHeader('content-Type', 'text/html');
//res.write('hello');
fs.readFile('./views/index.html',(err,data)=>{
    if(err){
        console.log(err);
        res.end();
    }else{
        res.end(data);
    }
})


});
server.listen(3001,'localhost',()=>{console.log('request made at localhost:3000')})