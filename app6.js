const express = require(express)
const hbs = require('hbs')
var app = express()
app.use(express.static(__dirname + '/public'));

app.get()

app.listen(3000, ()=>{
    console.log('server started')    
})