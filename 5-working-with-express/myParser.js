// a try to implement body parser 
const bodyParser = (req, res, next) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    //if there is no data
    if (data.length === 0) {
      return next();
    }
    const chunks = data.split("&");
    const body = {};
    for (let i = 0; i < chunks.length; i++) {
      // split key value 
      const keyValue = chunks[i].split("=");

      // handel spaces between words
      const valueSpaces = keyValue[1].split("+");
      let finalValue = "";
      for (const value of valueSpaces) {
        finalValue += value + " ";
      }
      // add key value to body object
      body[keyValue[0]] = finalValue.trim();
    }
    // attach body with req object
    req.body = body;
    return next();
  });
};


module.exports = bodyParser