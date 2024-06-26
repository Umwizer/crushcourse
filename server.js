const http = require("http");
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);
  const greet = _.once(() => {
    console.log(`hello `);
  });
greet()
  // set header content type
  res.setHeader("Content-Type", "text/html");
  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += '/about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 300;
      res.setHeader('Location', '/about');
      res.end();
      return; // End the request response immediately after redirection
    default:
      path += '/404.html';
      res.statusCode = 404;
      break;
  }

  // set an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(4000, "localhost", () => {
  console.log("listening on port 4000");
});
