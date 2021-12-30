//import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
var socket = io();
var ulLista= document.getElementById("ulLista");

var nuevoNombre = document.getElementById("nuevoNombre");

//posibles estados
var player_data;
var all_players;
var stats_turno;
var preChancellor=null;
//----------------


//Acciones-----------
var enviarNombre = document.getElementById("enviarNombre");
enviarNombre.addEventListener("click",function()
{
    if(nuevoNombre.value)
    {
        socket.emit("changed_username",{username:nuevoNombre.value});
        console.log("changed_username " + nuevoNombre.value)
        nuevoNombre.value="";
    }
});

socket.on("your_data",function(msg)
{
    console.log("your_data")
    player_data = msg;
    soyCero(msg);
})

socket.on("new_position",function(msg)
{
    player_data.position=msg.position;
    soyCero(msg);
    
})

socket.on("change_username_on_position",function(msg)
{
    var li=document.getElementById("ulLista").firstChild;
    var i=0;
    for(i=0;i<msg.position;i++){li=li.nextSibling;}
    li.innerText=msg.username;
    
})

socket.on("new_player",function(msg){renderPlayers(msg);})

socket.on("player_left",function(msg){renderPlayers(msg);})

socket.on("init_game_client",function(msg)
{
    all_players=msg.jugadores;
    var contStats=document.createElement("DIV");
    contStats.id="contStats";
    var blueCounter=document.createElement("P");
    blueCounter.id="blueCounter";
    blueCounter.innerText="Blue pasadas: "+ msg.stats.blue;
    var redCounter=document.createElement("P");
    redCounter.innerText="Red pasadas: "+msg.stats.red;
    redCounter.id="redCounter";
    var cantCartas=document.createElement("P");
    cantCartas.id="cantCartas";
    cantCartas.innerText="cartas en el mazo: " + msg.stats.cant_left;
    var cantDescarte=document.createElement("P");
    cantDescarte.innerText="cartas descartadas: " + msg.stats.cant_descart;
    contStats.appendChild(blueCounter);
    contStats.appendChild(redCounter);
    contStats.appendChild(cantCartas);
    contStats.appendChild(cantDescarte);
    document.body.append(contStats);
    
})

socket.on("asigned_pm",function()
{
    console.log("soy pm");
    var chancellor_select_container=document.createElement("DIV"); //div de seleccion chacellor
    chancellor_select_container.id="chancellorSelectContainer";

    var botonEnvio=document.createElement("BUTTON");    //boton para enviar 
    botonEnvio.id="botonEnvioChancellor";
    chancellor_select_container.appendChild(botonEnvio);
    botonEnvio.addEventListener("click",function()
    {
        if(preChancellor)
        {
            console.log("enviando prechancellor")
            socket.emit("selected_chancellor",preChancellor)
        }
    })

    var seleccion=document.createElement("P");  //muestra de seleccion
    seleccion.id="chancellorPreselected";
    seleccion.innerText="Chancellor preseleccionado:"
    chancellor_select_container.appendChild(seleccion);

    all_players.forEach(element => 
    {
        if(element.position!=player_data.position)
        {
            var newButton=document.createElement("BUTTON");
            newButton.id="pos"+element.position;
            chancellor_select_container.appendChild(newButton);
            newButton.addEventListener("click",function()
            {
                preChancellor=element;
                document.getElementById("chancellorPreselected").innerText="Chancellor preseleccionado: " + element.username;
            });
        }
    });
    document.body.appendChild(chancellor_select_container);
})

socket.on("init_vote",function(msg)
{
    
});

//Funciones Auxiliares-------------
function renderPlayers(msg)
{
    ulLista.innerHTML='';
    var i=0;
    msg.forEach(element => {
        var newLi=document.createElement("LI");
        newLi.innerText=element.username;
        newLi.id="player"+i.toString();
        i++;
        ulLista.appendChild(newLi);
    });
    all_players=msg;
}

function soyCero(msg)
{
    if(msg.position==0)
    {
        console.log("soy 0")
        var botonInicio= document.createElement("BUTTON");
        botonInicio.value="doy inicio";
        document.body.appendChild(botonInicio);
        botonInicio.addEventListener("click",function()
        {
            console.log("mando init a server ")
            if(all_players.length>=2){socket.emit("init_game",{});}    //HARDCODEADO PARA TESTEOS DEBERIA CAMBIARSE A 5!
            else{alert("Faltan owo-jugadores")}
        })
    }
}