const express = require('express');
const socketio = require('socket.io');
const app = express();

//statics:
const CANT_PASSED_MAX=4; //cantreq.params.idad de gobiernos pasados maxima 
const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista
const WINS_BLUE=5; //cantidad para que liberales ganen
const WINS_RED=5; //cantidad para que fascistas ganen
const MIN_RED_H=3; //minima cantidad de leyes rojas + Hitle cansiller 
const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal
const CANT_LIBS=1;//cantidad de jugadores liberales max
const CANT_FASC=1;//cantidad de jugadores fascistas max

var obj=
{
    jugadores:[],
    cant_jugadores:0,
    stack_cartas:null,
    stack_descartados:[],
    blue:0,
    red:0,
    pm_pos:0,
    chancellor:{},
    pm:{},
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
            socketId                    //id del socket del jugador
            rol:                        //rol en el juego
        }
    cant_jugadores                      //cantidad de jugadores 
    stack_cartas                        //el stack de cartas que faltan usar 
    stack_descartados                   //cartas que fueron descartadas por pm y chancellor
    blue                                //cantidad de leyes liberales pasadas
    red                                 //cantidad de leyes fascistas pasadas
    pm_pos                              //posicion del pm del turno
    chancellor                          //obj entero de quien es el chacellor del turno
    pm
    passed                              //gobiernos fallados antes de pasar ley obligatoriamente
    votos:
        {
            positivo                    //valor total de los votos (positivo el gobierno pasa)
            total                       //cantidad de votos recibidos
        }
}
*/
/*  //ordenadas por orden de aparicion en codigo

ACCIONES DESDE EL SERVER AL CLIENTE: *accion,carga que envia*

    new_player,database[].jugadores:                                          |   avisa a todos los clientes de un nuevo jugador, envia toda la lista de jugadores
    your_data,{username:,position:,socketId:}:                                |   le envia a al nuevo cliente la data necesaria para logica de front
    change_username_on_position,socket.position:                              |   retransmision del nuevo nombre de un jugador a todos
    new_position,{position:}:                                                 |   se le envia al cliente particular que al jugador se lo movio de asiento 
    player_left,database[].jugadores:                                         |   Se envia a todos los clientes una nueva lista de clientes conectados con los datos 
    init_game_client{jugadores:dataBase[].jugadores,stats:statStacks()}:      |   se le envia a los clientes los stats del mazo, asi como quien es el pm, etc.
    asigned_pm:                                                               |   se le envia al cliente correspondiente que es el pm para el turno, asi activa interfaz de eleccion de chancellor
    you_chancellor:                                                           |   avisa al jugador que se selecciono como chancellor que es el
    init_vote,{chancelor:}:                                                   |   server avisa que se debe activar la interfaz de votacion 
    blue_wins:                                                                |   Avisa que liberales ganaron
    red_wins:                                                                 |   Avisa que fascistas ganaron
    duo_won:                                                                  |   la votacion fue a favor de la dupla pm-chancellor
    duo_lost:                                                                 |   la votacion fue en contra de la dupla pm-chancellor
    next_turn:                                                                |   se llama al siguiente turno

ACCIONES DEL CLIENTE AL SERVER:*accion,carga que envia*

    changed_username:                                                         |   el cliente pide un cambio de nombre, el servidor lo almacena y retransmite a todos 
    disconnecting:                                                            |   un cliente se desconecta
    init_game:                                                                |   inicio del juego
    selected_chancellor:                                                      |   el server recibe quien es el posible chancellor para retransmitir
    voted_gov:                                                                |   el cliente hizo su voto
    
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
    dataBase[0].jugadores.push({username:socket.username,position:socket.position,socketId:socket.id}) //todavia no se como almacenar esa data que no sea un array con todas las posibles instancias de partreq.params.idas
    io.sockets.emit('new_player', dataBase[0].jugadores) //evento que indica que se debe agregar nuevo usuario en la posicion
    io.to(socket.id).emit("your_data",{username:socket.username,position:socket.position,socketId:socket.id}) //le envia la informacion propia del jugador a su front

    socket.on("changed_username",data=>
    {  //desde el front, recibe el server que alguien quiere cambiar su nombre
        socket.username=data.username
        dataBase[0].jugadores[socket.position].username=data.username;
        var out={position: socket.position,username: socket.username}
        io.sockets.emit('change_username_on_position', out) //envia nuevo nombre del usuario en esa posicion
    })

    socket.on("disconnecting",data=>
    {
        var flag=false;
        dataBase[0].jugadores=dataBase[0].jugadores.filter(jugador => jugador.position!=socket.position);    //se remueve al jugador que se esta yendo 
        dataBase[0].cant_jugadores--;
        for(var i=0;i<dataBase[0].jugadores.length;i++)     
        {
            dataBase[0].jugadores[i].position=i; //el resto de los jugadores se acomoda en los asientos para que esten juntos y en orden
            if(i>=socket.position){io.to( dataBase[0].jugadores[i].socketId).emit("new_position",{position: dataBase[0].jugadores[i].position})} //a cada jugador que se movio se le manda su nueva posicion
        }
        io.sockets.emit("player_left",dataBase[0].jugadores);

    });

    socket.on("init_game",data=>
    {//llega desde el front de pos=0 evento de iniciar partreq.params.ida
        initGame();
        var stats= statStack();
        io.sockets.emit('init_game_client',{jugadores:dataBase[0].jugadores,stats:stats}) //evento para iniciar el juego en todos los front
        io.to(socket.id).emit("asigned_pm"); //el que tiene el boton de inicio es el mismo que es el primer pm, pos 0
    });
    
    socket.on("selected_chancellor",data=>
    {//el primer ministro escogio chancellor y se inicia votacion
        dataBase[0].chancellor=data;
        io.to(dataBase[0].chancellor.socketId).emit("you_chancellor");  //avisa al cliente que se lo eligio chancellor que es chancellor
        io.sockets.emit("init_vote",{chancellor:data.chancellor}) //evento para que en todos los front aparezca para votar si/no
        
    });

    socket.on("voted_gov",data=>
    { //este cliente voto si/no sobre el gobierno
        //asumo por ahora que lo guardo en un array posicion es el req.params.id del juego
        console.log(data.vote)
        if(data.vote){dataBase[0].votos.positivos++} //se suma el voto (que es un bool)
        else{dataBase[0].votos.positivos--}
        dataBase[0].votos.total++
        if(dataBase[0].votos.total==dataBase[0].cant_jugadores) //si es el jugador final que voto
        {   
            if(dataBase[0].votos.positivos>=0) //si hay mas del 50% de votos positivos, devuelve a todos que el gobierno es exitoso, si el cliente es el pm, accede a 3 cartas
            {
                var winner = determine_winner()//por si al ganar este duo, ganan los fascistas
                if(winner!=false) //si hay un ganador 
                {
                    if(winner==BLUE){io.sockets.emit("blue_wins");}
                    else{io.sockets.emit("red_wins");}
                }
                var trio_cartas=[];
                for(var i=0;i<3;i++){trio_cartas.push(dataBase[0].stack_cartas.pop())} //obtengo las 3 cartas que se le envia al pm
                resetVotos(); //resetea los valores de los votos
                io.to(dataBase[0].pm.socketId).emit("pm_desition_client",{cartas:trio_cartas})
                io.sockets.emit("duo_won");
            }
            else
            {
                var passed_law=false;  //saber si tiene que pasar o no una ley, para que el front consulte en el evento enviado
                var law_to_send=null;
                dataBase[0].passed++;
                if(dataBase[0].passed==CANT_PASSED_MAX)    //si llego al limite de gobiernos skipeados
                {
                    passed_law=true;
                    dataBase[0].passed=0;    
                    law_to_send=dataBase[0].pop();
                }   
                io.sockets.emit("duo_lost",{passed_law:passed_law,law:law_to_send});     //se envia que perdio y si tenemos que pasar una ley obligatoriamente
                resetVotos(); //resetea los valores de los votos
                nextTurn();
                io.sockets.emit("next_turn",{next_pm:dataBase[0].pm}) //se envia a todos el nuevo pm con este evento 
                io.to(dataBase[0].pm.socketId).emit("asigned_pm");
            }
        }
    }) 

    socket.on("pm_desition",data=>
    {//desde el cliente que es el pm actual, decreq.params.idio que descartar
        dataBase[0].stack_descartados.push(data.descartada); //se guarda en la pila de descartados para remezclar mas adelante
        io.to(dataBase[0].chancellor.socketId).emit("chancellor_turn",{cartas:data.cartas}) //evento para todos que le toca al chancellor votar
    }) 

    socket.on("chancellor_desition",data=>//desde el cliente del chancellor actual, decreq.params.idio que descartar
    {
        dataBase[0].stack_descartados.push(data.descartada);
        lawCounter(data.selected);
        var winner = determine_winner(); //si ganan fascistas por cantreq.params.idad de leyes rojas o liberales por cantreq.params.idad de leyes azules
        if(winner!=false) //si hay un ganador 
        {
            if(winner==BLUE){io.sockets.emit("blue_wins");}
            else{io.sockets.emit("red_wins");}
        } 
        io.sockets.emit("law_done",{selected:data.selected}) //evento a todos para que vean que ley se paso
        nextTurn();
        if(dataBase[0].stack_cartas.length==0){dataBase[0].stack_cartas=shuffle()};
        var stats_stack=statStack();
        io.sockets.emit("next_turn",{next_pm:dataBase[0].pm,stats:stats_stack}); //se envia a todos el nuevo pm con este evento 
        io.to(dataBase[0].jugadores[dataBase[0].pm.position].socketId).emit("asigned_pm");
    }) 
})

//Funciones Auxiliares:
function cardStackGenerator()
{
    return([BLUE,RED,BLUE,RED,RED,RED,BLUE,RED,BLUE,RED,RED,BLUE,RED,RED,RED,RED,BLUE,BLUE,RED,RED,BLUE,BLUE,RED,RED,RED,BLUE,RED,RED,RED,RED])
    
} 

function shuffle(){return dataBase[0].stack_descartados}

function determine_winner()
{
    if(dataBase[0].blue==WINS_BLUE){return BLUE}
    else if(dataBase[0].red==WINS_RED){return RED}
    else if(dataBase[0].red==WINS_RED && dataBase[0].chancellor.rol==H){return RED}
    else{return false}
}

function nextTurn()
{
    if(dataBase[0].pm.position==dataBase[0].jugadores.length-1){dataBase[0].pm=dataBase[0].jugadores[0]}  //pasa al siguiente jugador para ser pm
    else{dataBase[0].pm=dataBase[0].jugadores[dataBase[0].pm.position+1]}
    dataBase[0].chancellor={}; //se borra el chancellor
}

function lawCounter(selected)
{
    if(selected==BLUE){dataBase[0].blue++}
    else{dataBase[0].red++}
}

function statStack()
{
    return {
        blue:dataBase[0].blue,
        red:dataBase[0].red,
        cant_left:dataBase[0].stack_cartas.length,
        cant_descart:dataBase[0].stack_descartados.length,
        pm_pos:dataBase[0].pm.position
    }
}

function initGame()
{
    var hechos=[];
    generateRol(hechos);
    dataBase[0].pm_pos=0;
    dataBase[0].stack_cartas=cardStackGenerator();
    dataBase[0].stack_descartados=[];
    dataBase[0].blue=0;
    dataBase[0].red=0;
    dataBase[0].chancellor={};
    dataBase[0].pm=dataBase[0].jugadores[0];
    dataBase[0].passed=0;
    resetVotos();
}

function resetVotos()
{
    dataBase[0].votos.positivos=0;
    dataBase[0].votos.total=0;
}

function generateRol(hechos)
{   //EN ESTE CASO DE DEMO PARA 2, NO PUEDO TESTEAR, TESTEARE MAS TARDE, AHORA HARDCODEO
    dataBase[0].jugadores[0].rol=LIB;
    dataBase[0].jugadores[1].rol=H;
    var i=0;
    /*while(i<CANT_FASC)    //EN TESTEOS VOY A USAR HITLER Y LIBS NOMAS PORQUE TENGO SOLO 2 
    {
        var rand=Math.floor(Math.random()*(dataBase[0].jugadores.length-1));
        console.log(rand)
        console.log(dataBase[0].jugadores)
        console.log(dataBase[0].jugadores[rand])
        if(!hechos.includes(rand))
        {
            dataBase[0].jugadores[rand].rol=FASC
            i++;
            hechos.push(rand);
        }
    }*/
    i=0;
    /*while(i<CANT_LIBS)
    {
        var rand=Math.floor(Math.random()*(dataBase[0].jugadores.length-1));
        console.log(rand)
        console.log(dataBase[0].jugadores)
        console.log(dataBase[0].jugadores[rand])
        if(!hechos.includes(rand))
        {
            dataBase[0].jugadores[rand].rol=LIB;
            i++;
            hechos.push(rand);
        }
    }*/
    /*while(i<1)
    {
        var rand=Math.floor(Math.random()*(dataBase[0].jugadores.length-1));
        console.log(rand)
        console.log(dataBase[0].jugadores)
        console.log(dataBase[0].jugadores[rand])
        if(!hechos.includes(rand))
        {
            dataBase[0].jugadores[rand].rol=H;
            i++;
            hechos.push(rand);
        }
    }*/
}
