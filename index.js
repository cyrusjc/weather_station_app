const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')

//middleware functions

// Create the server
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})
// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
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
  console.log(req.body);
  res.status(201).send('Successfull');
});