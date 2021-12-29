const express = require('express');
const socketio = require('socket.io');
const app = express();

//statics:
const CANT_PASSED_MAX=""; //cantreq.params.idad de gobiernos pasados maxima 
const BLUE=""; //ley liberal
const RED=""; //ley fascista
const WINS_BLUE=""; //cantidad para que liberales ganen
const WINS_RED=""; //cantidad para que fascistas ganen
const MIN_RED_H=""; //minima cantidad de leyes rojas + Hitle cansiller 
const H=""; //rol hitler
const FASC=""; //rol fascista
const LIB="";//rol liberal
const CANT_LIBS="";//cantidad de liberales max
const CANT_FASC="";//cantidad de fascistas max

var obj=
{
    jugadores:[],
    cant_jugadores:0,
    stack_cartas:[],
    stack_descartados:[],
    blue:0,
    red:0,
    pm_pos:0,
    chancellor:{},
    passed:0,
    votos:
        {
            positivos:0,
            total:0
        }
}
dataBase=[obj];
/* 
////dataBase plantilla\\\\
{
    jugadores:                          //array de jugadores en el id
        {
            username:                   //nombre del jugador
            pos:                        //posicion en mesa
            rol:                        //rol en el juego
        }
    cant_jugadores                      //cantidad de jugadores 
    stack_cartas                        //el stack de cartas que faltan usar 
    stack_descartados                   //cartas que fueron descartadas por pm y chancellor
    blue                                //cantidad de leyes liberales pasadas
    red                                 //cantidad de leyes fascistas pasadas
    pm_pos                              //posicion del pm del turno
    chancellor                          //obj entero de quien es el chacellor del turno
    passed                              //gobiernos fallados antes de pasar ley obligatoriamente
    votos:
        {
            positivo                    //valor total de los votos (positivo el gobierno pasa)
            total                       //cantidad de votos recibidos
        }
}
*/

app.set('view engine', 'ejs')
app.use(express.static('../front/'))

app.get("/",(req,res)=>
{
    
    res.render("index")
})
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
})

const io = socketio(server)


io.on('connection', socket => 
{
        console.log("New user connected");
        socket.username = "Anon";
        socket.position = dataBase[0].jugadores.length;
        dataBase[0].cant_jugadores++;
        dataBase[0].jugadores.push({username:socket.username,position:socket.position}) //todavia no se como almacenar esa data que no sea un array con todas las posibles instancias de partreq.params.idas
        io.sockets.emit('new_player', dataBase[0].jugadores) //evento que indica que se debe agregar nuevo usuario en la posicion
    
        socket.on("changed_username",data=>
        { //desde el front, recibe el server que alguien quiere cambiar su nombre
            console.log("changed_username")
            socket.username=data.username
            dataBase[0].jugadores[socket.position].username=data.username;
            var out={
                position: socket.position,
                username: socket.username
            }
            io.sockets.emit('change_username_on_position', out) //envia nuevo nombre del usuario en esa posicion
        })

        socket.on("disconnecting",data=>
        {
            var flag=false;
            dataBase[0].jugadores=dataBase[0].jugadores.filter(jugador => jugador.position!=socket.position)
            for(var i=0;i<dataBase[0].jugadores.length;i++){dataBase[0].jugadores[i].position=i;}
            io.sockets.emit("player_left",dataBase[0].jugadores);
        });
})

    /*socket.on("init_game",data=>
    {//llega desde el front de pos=0 evento de iniciar partreq.params.ida
        initGame();
        var stats= statStack();
        io.sockets.emit('init_game',{jugadores:dataBase[req.params.id].jugadores,stats:stats}) //evento para iniciar el juego en todos los front
    }) 

    socket.on("selected_chancellor",data=>
    {//el primer ministro escogio chancellor y se inicia votacion
        dataBase[req.params.id].chancellor=data.chancellor //data.chancellor = obj{username,position}
        io.sockets.emit("init_vote",{chancellor:data.chancellor}) //evento para que en todos los front aparezca para votar si/no
    }) 

    socket.on("voted_gov",data=>
    { //este cliente voto si/no sobre el gobierno
        //asumo por ahora que lo guardo en un array posicion es el req.params.id del juego
        if(data.vote){dataBase[req.params.id].votos.positivo++} //se suma el voto (que es un bool)
        else{dataBase[req.params.id].votos.positivo--}
        dataBase[req.params.id].votos.total++
        if(dataBase[req.params.id].votos.total==dataBase[req.params.id].cant_jugadores) //si es el jugador final que voto
        {   
            if(dataBase[req.params.id].votos.positivos>=0) //si hay mas del 50% de votos positivos, devuelve a todos que el gobierno es exitoso, si el cliente es el pm, accede a 3 cartas
        {
            var winner = determine_winner()//por si al ganar este duo, ganan los fascistas
            if(winner!=false) //si hay un ganador 
            {
                if(winner==BLUE){io.socket.emit("blue_wins");}
                else{io.socket.emit("red_wins");}
            }
            var trio_cartas=[];
            for(var i=0;i<3;i++){trio_cartas.push(dataBase[req.params.id].stack_cartas.pop())} //obtengo las 3 cartas que se le envia al pm
            resetVotos(); //resetea los valores de los votos
            io.sockets.emit("duo_won",{pm_pos:dataBase[req.params.id].pm_pos,trio_cartas:trio_cartas})}//se envia pm_pos para que el front del pm acceda al trio de cartas
        else
        {
            var passed_law=false;  //saber si tiene que pasar o no una ley, para que el front consulte en el evento enviado
            dataBase[req.params.id].passed++;
            if(database[req.params.id].passed==CANT_PASSED_MAX)    //si llego al limite de gobiernos skipeados
            {
                passed_law=true;
                dataBase[req.params.id].passed=0;    
            }
            io.socket.emit("duo_lost",{passed_law:passed_law,law:dataBase[req.params.id].stack_cartas});     //se envia que perdio y si tenemos que pasar una ley obligatoriamente
            resetVotos(); //resetea los valores de los votos
            nextTurn();
            io.socket.emit("next_turn",{next_pm:dataBase[req.params.id].pm_pos}) //se envia a todos el nuevo pm con este evento 
        }
            }
    }) 

    socket.on("pm_desition",data=>
    {//desde el cliente que es el pm actual, decreq.params.idio que descartar
        dataBase[req.params.id].stack_descartados.push(data.descartada); //se guarda en la pila de descartados para remezclar mas adelante
        io.socket.emit("chancellor_turn",{duo_cartas:data.duo_cartas,chancellor:dataBase[req.params.id].chancellor.position}) //evento para todos que le toca al chancellor votar
    }) 

    socket.on("chancellor_desition",data=>//desde el cliente del chancellor actual, decreq.params.idio que descartar
    {
        dataBase[req.params.id].stack_descartados.push(data.descartada);
        lawCounter(data.selected);
        var winner = determine_winner(); //si ganan fascistas por cantreq.params.idad de leyes rojas o liberales por cantreq.params.idad de leyes azules
        if(winner!=false) //si hay un ganador 
        {
            if(winner==BLUE){io.socket.emit("blue_wins");}
            else{io.socket.emit("red_wins");}
        } 
        io.socket.emit("law_done",{selected:data.selected}) //evento a todos para que vean que ley se paso
        nextTurn();
        var stats_stack=statStack();
        io.socket.emit("next_turn",{next_pm:dataBase[req.params.id].pm_pos,stats:stats_stack}) //se envia a todos el nuevo pm con este evento 
    }) */



//Funciones Auxiliares:
/*function cardStackGenerator()
{
    
    //Genera una pila aleatoria con 10 azules y 20 rojas
    //se manda al front la cantreq.params.idad total de cartas
    
} */

/*function shuffle(stack_cartas){}*/

/*function determine_winner()
{
    if(dataBase[req.params.id].blue==WINS_BLUE){return BLUE}
    else if(dataBase[req.params.id].red==WINS_RED){return RED}
    else if(dataBase[req.params.id].red==WINS_RED && dataBase[req.params.id].chancellor.rol==H){return RED}
    else{return false}
}

function nextTurn()
{
    dataBase[req.params.id].pm_pos++   //pasa al siguiente jugador para ser pm
    if(dataBase[req.params.id].pm_pos>dataBase[req.params.id].cant_jugadores){dataBase[req.params.id].pm_pos=0;} //y si se pasa, vuelve al principio
    dataBase[req.params.id].chancellor={}; //se borra el chancellor
}

function lawCounter(selected)
{
    if(selected==BLUE){dataBase[req.params.id].blue++}
    else{dataBase[req.params.id].red++}
}

function statStack()
{
    return {
        blue:dataBase[req.params.id].blue,
        red:dataBase[req.params.id].red,
        cant_left:dataBase[req.params.id].stack_cartas.legth,
        cant_descart:dataBase[req.params.id].stack_descartados.length,
    }
}

function initGame()
{
    var counters={counterLibs:0,counterfasc:0,hit:0}
    dataBase[req.params.id].jugadores.foreach(element =>
    {
        var rol=generateRol(counters);
        element.rol=rol;
    })
    dataBase[req.params.id].pm_pos=0;
    dataBase[req.params.id].stack_cartas=cardStackGenerator();
    dataBase[req.params.id].stack_descartados=[];
    dataBase[req.params.id].blue=0;
    dataBase[req.params.id].red=0;
    dataBase[req.params.id].chancellor={};
    dataBase[req.params.id].passed=0;
    resetVotos();
}

function resetVotos()
{
    dataBase[req.params.id].votos.positivos=0;
    dataBase[req.params.id].votos.total=0;
}

function generateRol(counters)
{
    var rand=Math.floor(Math.random()*2)
    if(rand == 0) //toca hitler
    {
        if(counters.hit==0)
        {
            counters.hit++;
            return H;
        }
        else{return generateRol(counters);}
    }
    else if(rand == 1) //toca lib
    {
        if(counters.counterLibs==CANT_LIBS){return generateRol(counters);}
        else
        {
            counters.counterLibs++;
            return BLUE;
        }
    }
    else if(rand == 2)//toca fascista
    {
        if(counters.counterfasc==CANT_FASC){return generateRol(counnters);}
        else
        {
            counters.counterfasc++;
            return RED;
        }
    }
}
*/