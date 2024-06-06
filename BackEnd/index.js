const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.send('wdadawdwa');
}) 

app.listen(5000,()=>{
 console.log("starting...");
});