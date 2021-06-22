const express = require("express");
const router = express.Router();


const Data = require('../models/data');

const cowsay = require('cowsay');
const cors = require('cors');

// Post ata obtained from Arduino stored in the body of request
// Data is then stored in Data object defined in ./models/data.js
// Data is then uploaded and saved to DB on mongoDB using mongoose
router.post('/', (req, res)=>{
    // console.log(req.body);
    // console.log(typeof req.body.x1);
    //console.log(getDateTime());
    
    let data = Data();
    
    data.x_data = req.body.x1;
    data.y_data = req.body.y1
  
    console.log(data);
    // data.save()
    //   .then((result) => {
    //     res.send(result)
    //   })
    //   .catch((err)=>{console.log(err)});
    //console.log(data.x_data,data.y_data);
    
    res.status(201).send('Successfull');
  });
  
  module.exports = router;