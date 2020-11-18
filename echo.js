const http = require('http');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) =>{

    const { headers, method, url } = req;
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        res.on('error', (err) => {
            console.error(err);
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        res.write(JSON.stringify(responseBody.body+"\n"));
        res.write(responseBody.url);
        res.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });

});

server.listen(3000,()=>{
    console.log('Running')
});
/*
switch (req.url) {
    case '/':
        res.writeHead(200,{"Content-Type": "text, charset=utf-8;"});
        res.end("home");
    case '/post':
        res.writeHead(200,{"Content-Type": "text, charset=utf-8;"});
        req.on('data',(data)=>{
            //res.write("sending...");
            res.write(data);
        });
    default:
        res.writeHead(200,{"Content-Type": "text, charset=utf-8;"});
        res.end("another page");

}

 */