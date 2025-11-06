require('dotenv').config();  
const app=require('./src/app');
const initSockets=require('./src/sockets/socket.server'); 
const { createServer } = require("http");
const httpServer = createServer(app); 
     
initSockets(httpServer); 
httpServer.listen(3000, () =>{    
    console.log(`Server started on port 3000`) 
});
  
 
 
   






