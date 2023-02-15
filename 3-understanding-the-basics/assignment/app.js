const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<h1>Welcome</h1>");
    res.write('<body> <form method="POST" action="/create-user" > <input name="username"> <button type="submit" > Add User</button>  </form> </body>')
    return res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Types", "text/html");
    res.write(
      "<body><ul> <li>User 1</li> <li>User 2</li> <li>User 3</li></ul></body>"
    );
    res.end();
  }
  else if( url === '/create-user'){
    const chunks = []
    req.on('data', (chunk)=>{
        chunks.push(chunk)
    })
    req.on('end', ()=>{
        console.log(Buffer.concat(chunks).toString().split('=')[1])
        res.statusCode = 302
        res.setHeader('Location', '/')      
        return res.end()
    })
    

  }
});

server.listen(3000);
