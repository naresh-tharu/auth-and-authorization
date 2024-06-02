// import { createServer } from 'http';
import http from 'http'
import "dotenv/config";
import app from "./src/config/express.config.js";
const server = http.createServer(app);

const port = process.env.PORT || 9005;
server.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running to the port:${port}`);
    console.log(`Press ctrl+c to disconnect the server`)
  } else {
    console.log(`Server error: ${err}`)
  }
})