const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  if (url === "/") {
    // set response headers
    res.setHeader("Content-Type", "text/html");

    res.write(
      "<body><form method='POST' action='/message' > <input name='message' type='text'> <button type='submit'>Send</button> </form> </body>"
    );
    return res.end();
    ///  /message
  } else if (url === "/message" && req.method === "POST") {
    const chunks = [];
    req.on("error", (error) => {
      console.log(error);
    });
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", (data) => {
      const message = Buffer.concat(chunks).toString().split("=")[1];
      //   fs.writeFileSync("messages.txt", message);
      fs.writeFile("./messages.txt", message, (error) => {
        if (error) {
          console.log("error", error);          
          res.write("server error");
          return res.end();
          
        }
        res.statusCode = 302;        
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};


module.exports = requestHandler

// other way to export 
// module.exports = {
//   handler:requestHandler, 
//   someText: 'Some text '
// }
