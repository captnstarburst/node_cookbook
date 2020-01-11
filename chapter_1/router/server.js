const http = require('http');
const path = require('path');

const pages = [
    {route: "", output: "Woohoo!" },
    {route: "about", output: "A Simple routing example"},
    {route: "another page", 
        output: function(){
            return "here's another " + this.route
        }
    }
];

http.createServer(function (req ,res){
    /* Path module is used to extract the final part of the url   
        and decodeURI is used to reverse any URI encoding
    */
    const lookup = path.basename(decodeURI(req.url));

    pages.forEach(function(page) {
        if(page.route === lookup){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(typeof page.output === "function" ?
                page.output() : page.output
            );
        }
    });

    if(!res.finished){
        res.writeHead(404);
        res.end('Page Not Found');
    }
}).listen(8080);