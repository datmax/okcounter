const express = require("express")
const bodyParser = require("body-parser")
const app = express()
var mongoose = require("mongoose")

var Ok = mongoose.model("ok",{
    counter: Number
})

const server = require("http").Server(app)
const io = require("socket.io")(server);

server.listen(3000, ()=>{
    console.log("server listening on port 3000")
})

app.get("/",(req,res)=>{
    res.send("hello there")
})

io.on("connection",function(socket){
    socket.on("ok", function(){
        socket.emit("add")
    })
    //socket.on("close",function(payload){
    //    
    //})
})

