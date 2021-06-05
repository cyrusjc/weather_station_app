const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');
const Data = require('./models/data');
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');

// Create the server
const app = express();

// var declaration
let data = new Data();

//connect to mongoDB
const dbURI = "mongodb+srv://user:12345@app.kcshw.mongodb.net/app_data?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=> console.log('connected'))
  .catch((err)=> console.log(err));


//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//let data_ob = new Date();

// mongoose and mongo sandbox route 



// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
// // Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })


// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo, message: 'i am the message' })
  } catch (err) {
    next(err)
  }
})

// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    //console.log(moo);
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

app.get('/api/getData/', cors(), async (req, res, next) => {
  try {
    // console.log("reaching");
    res.json({data })
  } catch (err) {
    next(err)
  }
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

app.post('/', (req, res)=>{
  // console.log(req.body);
  // console.log(typeof req.body.x1);
  //console.log(getDateTime());

  data.x_data = req.body.x1;
  data.y_data = req.body.y1

  console.log(data);
  // data.save()
  //   .then((result) => {
  //     res.send(result)
  //   })
  //   .catch((err)=>{console.log(err)});
  //console.log(data.x_data,data.y_data);
  
  //res.status(201).send('Successfull');
});



// function getDateTime() {

//   var date = new Date();

//   var hour = date.getHours();
//   hour = (hour < 10 ? "0" : "") + hour;

//   var min  = date.getMinutes();
//   min = (min < 10 ? "0" : "") + min;

//   var sec  = date.getSeconds();
//   sec = (sec < 10 ? "0" : "") + sec;

//   var year = date.getFullYear();

//   var month = date.getMonth() + 1;
//   month = (month < 10 ? "0" : "") + month;

//   var day  = date.getDate();
//   day = (day < 10 ? "0" : "") + day;

//   return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

// }