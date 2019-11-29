import http from 'http';
import url from 'url';
import route from "./router";

let port = 8000;


const start = () => {
  const onRequest =(req, res) => {
    let pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`);

    route(pathname);

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hello world");
    res.end();
  };
  http.createServer(onRequest).listen(port);
  console.log(`Server has started on port: ${port}`);
};


export default start;
