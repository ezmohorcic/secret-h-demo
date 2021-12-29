//import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
var socket = io();
var ulLista= document.getElementById("ulLista");
var enviarNombre = document.getElementById("enviarNombre");
var nuevoNombre = document.getElementById("nuevoNombre")
var player_data;

enviarNombre.addEventListener("click",function()
{
    if(nuevoNombre.value)
    {
        socket.emit("changed_username",{username:nuevoNombre.value});
        console.log("changed_username " + nuevoNombre.value)
        nuevoNombre.value="";
    }
});

socket.on("your_data",function(msg){player_data = msg;})

socket.on("change_username_on_position",function(msg)
{
    var li=document.getElementById("ulLista").firstChild;
    var i=0;
    for(i=0;i<msg.position;i++){li=li.nextSibling;}
    li.innerText=msg.username;
    
})

socket.on("new_player",function(msg){renderPlayers(msg);})

socket.on("player_left",function(msg){renderPlayers(msg);})

function renderPlayers(msg)
{
    ulLista.innerHTML='';
    console.log(msg)
    msg.forEach(element => {
        var newLi=document.createElement("LI");
        newLi.innerText=element.username;
        ulLista.appendChild(newLi);
    });
}