const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // Read the saved message from message.txt file
    fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        console.log(err);
        data = 'No message available'; // Fallback if the file doesn't exist or is empty
      }

      // Show the form with the saved message on top
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Enter message</title></head>');
      res.write(`<body><h1>${data}</h1>`);
      res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
      res.write('</body></html>');
      return res.end(); // End response after showing the form
    });
  } 

  else if (url === '/message' && method === 'POST') {
    const body = [];

    // Collect the data from the form submission
    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      // Parse the form data
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      // Write the message to the message.txt file
      fs.writeFile('message.txt', message, err => {
        if (err) {
          console.log(err);
        }

        // Redirect back to the form page
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  // Default block for any other URL
  else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    return res.end();
  }
});

server.listen(5000);
