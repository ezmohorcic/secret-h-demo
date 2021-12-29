//import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
var socket = io();
var ulLista= document.getElementById("ulLista");
var enviarNombre = document.getElementById("enviarNombre");
var nuevoNombre = document.getElementById("nuevoNombre")
enviarNombre.addEventListener("click",function()
{
    if(nuevoNombre.value)
    {
        socket.emit("changed_username",nuevoNombre.value);
        console.log("changed_username " + nuevoNombre.value)
        nuevoNombre.value="";
    }
});

socket.on("change_username_on_position",function(msg)
{
    var li=document.getElementById("ulLista").firstChild;
    for(var i=0;i<msg.position;i++){li=li.nextSibling;}
    li.innerText=msg.username;
    
})

socket.on("new_player",function(msg)
{
    renderPlayers(msg);
})

socket.on("player_left",function(msg)
{
    renderPlayers(msg);
})

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