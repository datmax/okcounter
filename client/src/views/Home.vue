<template>
  <div class="home">
    <p id="data"></p>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
<br>
<h1>Numbers of ok:</h1><h1 id="ok">0</h1>
  </div>
</template>

<script>
// @ is an alias to /src
var socket = io.connect("http://localhost:3000")
socket.on("connect", ()=>{
  socket.emit("event")
  socket.on("a", function(data){
    document.getElementById("data").innerText = data
  })
})
var ok = 0
import io from "socket.io-client"
let SpeechRecognition = window.webkitSpeechRecognition
var recognition = new SpeechRecognition()
var grammar = "ok | k | ke | okay| mk| oke| kai| hk | mmmkay| mmkay | mkay| m k "
var list = new webkitSpeechGrammarList()
list.addFromString(grammar, 1)
recognition.grammars = list
recognition.lang = "en-US"
SpeechRecognition.continuous = true
recognition.onend = function(){
  recognition.stop();
  setTimeout(()=>{
    recognition.start()
  },500)
}
recognition.onresult = function(event){
  socket.emit("ok")
  recognition.stop()
  setTimeout(() => {
    recognition.start()
  }, 500);
}
socket.on("add",function(){
  ok += 1
  document.getElementById("ok").innerHTML = ok.toString()
})


export default {
  name: 'home',
  data: function(){
    return{
      data: ""
    }
  },
  methods: {
    start(){
      recognition.start();
      console.log("start")
    },
    stop(){
      recognition.stop();
      console.log("stop")
    }
  }
}
</script>
