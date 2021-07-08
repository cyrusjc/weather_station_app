const path = require('path');
const cors = require('cors');

// data model schema for mongoose
const Data = require('./models/data');	

// object hash is for obtaining a hash key from our sketchpad object to obtain a unique key 
// to ensure we do not store multiple sketches
var hash = require('object-hash');

const Coordinate = require('./models/coordinate.js');	
global.data = new Coordinate();

//========================================
// Initializing Express
//========================================
const express = require('express');
// backend declaration
const PORT_BACKEND = process.env.PORT || 5000
const app_backend = express();
const index = require("./routes/index");

//middleware functions
app_backend.use(express.urlencoded({extended: false}));
app_backend.use(express.json());
app_backend.use(index);

const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');

// // Serve static files from the React frontend app
// app_backend.use(express.static(path.join(__dirname, 'client/build')))
// // Anything that doesn't match the above, send back index.html
// app_backend.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })


app_backend.listen(PORT_BACKEND, () => {
  console.log(`Mixing it up on port ${PORT_BACKEND}`)
})


//========================================
// Initializing Mongoose=================
//========================================
const mongoose = require('mongoose');

require('dotenv').config();

//Connecting to mongoDB using mongoose
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=> console.log('connected'))
  .catch((err)=> console.log(err));

//========================================
// Initializing socket.io and http
//========================================

const app = express();
const http = require("http");

const socket_index = require("./routes/socket_index");
app.use(socket_index);

//port declaration
const PORT_SOCKET = process.env.PORT || 4001;

//socket.io declaratio
const server = http.createServer(app);
//const io = socketIo(server); 
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 100);

  // this socket takes data from client/sketchpad.js and obtains a hashkey to store sketch into mongoDB 
  socket.on("saveDB", sketch => {

    data = Data();
    data.points = sketch;
    data.hashKey = hash(sketch);

    Data.findOne({hashKey : data.hashKey})
      .then(found =>{
        if(found){
          console.log("Data already exists");
        }
        else{
          data.save()
          .then(() => {
            console.log("Saved");
          })
          .catch((err)=>{console.log(err)});
    
        }
      })
      .catch( err => {
        console.log(err);
      })


  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});



const getApiAndEmit = socket => {
  const response = {}
  socket.emit("FromAPI", data);
};

server.listen(PORT_SOCKET, () => {
  console.log(`Listening on port ${PORT_SOCKET}`)
});
