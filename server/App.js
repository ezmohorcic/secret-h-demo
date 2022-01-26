const express = require('express');
const socketio = require('socket.io');
const app = express();

//statics:
const CANT_PASSED_MAX=3; //cantidad de gobiernos pasados maxima 
const BLUE="blue"; //ley liberal
const RED="red"; //ley fascista
const WINS_BLUE=5; //cantidad para que liberales ganen
const WINS_RED=6; //cantidad para que fascistas ganen
const MIN_RED_H=3; //minima cantidad de leyes rojas + Hitle cansiller 
const H="hitler"; //rol hitler
const FASC="fascista"; //rol fascista
const LIB="liberal";//rol liberal
const EXAMINE_DECK="examine_deck";
const KILL_PLAYER="kill";
const EXAMINE_PLAYER="examine_player";
const PICK_CANDIDATE="pick_candidate";


/*var obj=
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
    skipped:0,
    fasc_players:[],
    h_player:{},
    board:{},
    last_elected:{},
    mod_total:0,
    votos:
        {
            positivos:0,
            total:0
        }
}*/

class roomDataBase
{
    constructor()
    {
        this.jugadores=[];
        this.cant_jugadores=0;
        this.stack_cartas=null;
        this.stack_descartados=[];
        this.blue=0;
        this.red=0;
        this.pm_pos=0;
        this.chancellor={};
        this.pm={};
        this.skipped=0;
        this.fasc_players=[];
        this.h_player={};
        this.board={};
        this.last_elected={};
        this.mod_total=0;
        this.votos=
        {
            positivos:0,
            total:0
        }
    }
}

dataBase=new Array(20);


/* 
////dataBase plantilla\\\\
{
    jugadores:                          //array de jugadores en el id
        {
            username:                   //nombre del jugador
            pos:                        //posicion en mesa
            socketId                    //id del socket del jugador
            rol:                        //rol en el juego
            estado:                     //vivo o muerto
        }
    cant_jugadores                      //cantidad de jugadores 
    stack_cartas                        //el stack de cartas que faltan usar 
    stack_descartados                   //cartas que fueron descartadas por pm y chancellor
    blue                                //cantidad de leyes liberales pasadas
    red                                 //cantidad de leyes fascistas pasadas
    pm_pos                              //posicion del pm del turno
    chancellor                          //obj entero de quien es el chacellor del turno
    pm                                  //pm actual
    skipped                             //gobiernos fallados antes de pasar ley obligatoriamente
    fasc_players                        //fascistas
    h_player                            //hitler
    last_elected                        //Last elected duo
    board:
        {
            position_N:                 //se le agrega el tipo de poder como value, N siendo el numero de ley RED que se instauro
        }
    votos:
        {
            positivo                    //valor total de los votos (positivo el gobierno pasa)
            total                       //cantidad de votos recibidos
        }
}
*/
/*  //ordenadas por orden de aparicion en codigo

EVENTOS DESDE EL SERVER AL CLIENTE: *evento,carga que envia*

    join_room,roomKey                                                         |   Se envia la key del nuevo room al cliente
    new_player,database[].jugadores:                                          |   avisa a todos los clientes de un nuevo jugador, envia toda la lista de jugadores
    your_data,{username:,position:,socketId:}:                                |   le envia a al nuevo cliente la data necesaria para logica de front
    change_username_on_position,socket.position:                              |   retransmision del nuevo nombre de un jugador a todos
    new_position,{position:}:                                                 |   se le envia al cliente particular que al jugador se lo movio de asiento 
    player_left,database[].jugadores:                                         |   Se envia a todos los clientes una nueva lista de clientes conectados con los datos 
    init_game_client{jugadores:dataBase[].jugadores,stats:statStack()}:       |   se le envia a los clientes los stats del mazo, asi como quien es el pm, etc.
    asigned_pm:                                                               |   se le envia al cliente correspondiente que es el pm para el turno, asi activa interfaz de eleccion de chancellor
    you_chancellor:                                                           |   avisa al jugador que se selecciono como chancellor que es el
    init_vote,{chancelor:}:                                                   |   server avisa que se debe activar la interfaz de votacion 
    blue_wins:                                                                |   Avisa que liberales ganaron
    red_wins:                                                                 |   Avisa que fascistas ganaron
    duo_won:                                                                  |   la votacion fue a favor de la dupla pm-chancellor
    duo_lost:                                                                 |   la votacion fue en contra de la dupla pm-chancellor
    next_turn:                                                                |   se llama al siguiente turno
    pm_desition_client,{cartas:}:                                             |   Se envia al cliente que es pm las 3 cartas para que decida
    chancellor_turn,{cartas:}:                                                |   se le avisa al cliente chancellor que es su turno de decidir, se le envia las 2 cartas
    law_done,{selected:}:                                                     |   Se envia la ley que fue elegida por pm+chancellor
    your_rol,rol:                                                             |   Se envia el rol del jugador
    know_fasc,fasc_players,h_player:                                          |   Se envia a los fascistas quienes son y quien es hitler, tambien hitler puede que reciba si hay menos de 7 jugadores
    assasination,position                                                     |   Manda comando para que se cambie el estado del jugador muerto 
    assasinated                                                               |   Manda aviso al jugador asesinado  
    examine_deck,cards                                                        |   Manda comando para mostrar cartas de deck
    kill                                                                      |   Manda comando para que active power de asesinato al pm actual 
    pick_candidate                                                            |   Manda comando para que active power de elegir pm al pm actual 

EVENTOS DEL CLIENTE AL SERVER:*evento,carga que envia*

    changed_username:                                                         |   el cliente pide un cambio de nombre, el servidor lo almacena y retransmite a todos 
    disconnecting:                                                            |   un cliente se desconecta
    init_game:                                                                |   inicio del juego
    selected_chancellor:                                                      |   el server recibe quien es el posible chancellor para retransmitir
    voted_gov:                                                                |   el cliente hizo su voto
    pm_desition:                                                              |   pm hizo su descarte y envio las 3 cartas
    chancellor_desition:                                                      |   descarte y decision final del chancellor
    kill,victim:                                                              |   el pm envia a quien asesino
    pick_candidate,candidate:                                                 |   el pm elige quien es el siguiente pm
    new_room                                                                  |   Cliente pide nueva room
    join_room,roomkey                                                         |   Cliente indica a que room quiere entrar
    set_sv_position,position                                                  |   Front avisa al socket en sv para actualizar la posicion
*/


app.set('view engine', 'ejs')
app.use(express.static('../newFront/'))

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
    socket.on("new_room",data=>
    {

        const roomdata=createDataBase();
        io.to(socket.id).emit("join_room",roomdata.roomKey) 
    });

    socket.on("join_room",data=>
    {
        socket.roomKey = data;
        socket.roomId=hash(data);
        socket.dataBase=assignDataBase(data,socket.roomId);
        socket.join(data);

        socket.username = "Anon";
        socket.position = socket.dataBase.jugadores.length;
        socket.dataBase.cant_jugadores++;
        socket.dataBase.jugadores.push({username:socket.username,position:socket.position,socketId:socket.id,estado:"alive",rol:"",sala:socket.roomKey}) 
        
        console.log("your_data");
        console.log(socket.id)
        io.to(socket.id).emit("your_data",{all_players:socket.dataBase.jugadores,userData:{username:socket.username,position:socket.position,socketId:socket.id,estado:"alive",rol:"",sala:socket.roomKey}}) //le envia la informacion propia del jugador a su front
        console.log("mande your_data")
        socket.to(socket.roomKey).emit('new_player', socket.dataBase.jugadores) //evento que indica que se debe agregar nuevo usuario en la posicion
    });

    socket.on("changed_username",data=>
    {  //desde el front, recibe el server que alguien quiere cambiar su nombre
        socket.username=data.username;
        socket.dataBase.jugadores[socket.position].username=data.username;
        io.to(socket.roomKey).emit('change_username_on_position', {position:socket.position,username:socket.username}); //envia nuevo nombre del usuario en esa posicion
    })

    socket.on("disconnecting",data=>
    {
        if(socket.hasOwnProperty("dataBase"))
        {
            socket.dataBase.jugadores=socket.dataBase.jugadores.filter(jugador => jugador.position!=socket.position);    //se remueve al jugador que se esta yendo 
            socket.dataBase.cant_jugadores--;   //se va uno, resto
            for(var i=0;i<socket.dataBase.jugadores.length;i++)     
            {
                socket.dataBase.jugadores[i].position=i; //el resto de los jugadores se acomoda en los asientos para que esten juntos y en orden
                socket.position=i;  //coloco nueva posicion
                io.to( socket.dataBase.jugadores[i].socketId).emit("new_position",{position: socket.dataBase.jugadores[i].position, players:socket.dataBase.jugadores}) //a cada jugador que se movio se le manda su nueva posicion
            }
            socket.leave(socket.roomKey);
        }
    });

    socket.on("set_sv_position",data=>{socket.position=data});

    socket.on("init_game",data=>
    {//llega desde el front de pos=0 evento de iniciar partreq.params.ida
        initGame(socket);
        var stats= statStack(socket);
        socket.dataBase.jugadores.forEach(element =>{io.to(element.socketId).emit("your_rol",element.rol)}) //A cada cliente se le envia su rol de juego
        io.to(socket.roomKey).emit('init_game_client',{jugadores:socket.dataBase.jugadores,stats:stats,next_pm:socket.dataBase.jugadores[0]}) //evento para iniciar el juego en todos los front
        io.to(socket.id).emit("asigned_pm")
    });
    
    socket.on("selected_chancellor",data=>
    {//el primer ministro escogio chancellor y se inicia votacion
        socket.dataBase.chancellor=data;
        console.log(data);
        //io.to(socket.dataBase.chancellor.socketId).emit("you_chancellor");  //avisa al cliente que se lo eligio chancellor que es chancellor
        io.to(socket.roomKey).emit("init_vote",{chancellor:data}) //evento para que en todos los front aparezca para votar si/no
        
    });

    socket.on("voted_gov",data=>
    { //este cliente voto si/no sobre el gobierno
        //asumo por ahora que lo guardo en un array posicion es el req.params.id del juego
        if(data.vote){socket.dataBase.votos.positivos++} //se suma el voto (que es un bool)
        else{socket.dataBase.votos.positivos--}
        socket.dataBase.votos.total++
        if(socket.dataBase.votos.total==socket.dataBase.cant_jugadores - socket.dataBase.mod_total) //si es el jugador final que voto
        {   
            if(socket.dataBase.votos.positivos>=0) //si hay mas del 50% de votos positivos, devuelve a todos que el gobierno es exitoso, si el cliente es el pm, accede a 3 cartas
            {
                var winner = determine_winner("h_chancellor",socket)//por si al ganar este duo, ganan los fascistas
                if(winner!=false) //si hay un ganador 
                {
                    if(winner==BLUE){socket.dataBase.jugadores.forEach(element=>
                    {
                        io.to(element.socketId).emit("blue_wins",element.position)
                    });}
                    else
                    {socket.dataBase.jugadores.forEach(element=>
                    {
                        io.to(element.socketId).emit("red_wins",element.position)
                    });}
                }
                var trio_cartas=[];
                for(var i=0;i<3;i++) //obtengo las 3 cartas que se le envia al pm
                {
                    if(socket.dataBase.stack_cartas.length==0){socket.dataBase.stack_cartas=shuffle(socket.dataBase.stack_descartados)}
                    trio_cartas.push(socket.dataBase.stack_cartas.pop());
                }
                resetVotos(socket); //resetea los valores de los votos
                io.to(socket.dataBase.pm.socketId).emit("pm_desition_client",{cartas:trio_cartas});
                io.to(socket.roomKey).emit("duo_won");
            }
            else
            {
                var passed_law=false;  //saber si tiene que pasar o no una ley, para que el front consulte en el evento enviado
                var law_to_send=null;
                socket.dataBase.skipped++;
                if(socket.dataBase.skipped==CANT_PASSED_MAX)    //si llego al limite de gobiernos skipeados
                {
                    passed_law=true;
                    socket.dataBase.skipped=0;    
                    if(socket.dataBase.stack_cartas.length==0){socket.dataBase.stack_cartas=shuffle(socket.dataBase.stack_descartados)} //se obtienen las cartas
                    law_to_send=socket.dataBase.stack_cartas.pop();
                    lawCounter({selected:law_to_send},socket); //se suma la ley al contador
                    io.to(socket.roomKey).emit("duo_lost",{passed_law:passed_law,selected:law_to_send,counter:socket.dataBase[law_to_send]});     //se envia que perdio y si tenemos que pasar una ley obligatoriamente
                    resetVotos(socket); //resetea los valores de los votos
                    nextTurn(socket); //genera el siguiente pm
                    powerTurn({selected:law_to_send},socket); //se envia al analisis de poder al pm
                }
                else
                {   
                    io.to(socket.roomKey).emit("duo_lost",{passed_law:passed_law,selected:law_to_send});     //se envia que perdio y si tenemos que pasar una ley obligatoriamente
                    resetVotos(socket); //resetea los valores de los votos
                    nextTurn(socket);
                    var stats_stack=statStack(socket);
                    io.to(socket.roomKey).emit("next_turn",{next_pm:socket.dataBase.pm,stats:stats_stack}) //se envia a todos el nuevo pm con este evento 
                    io.to(socket.dataBase.pm.socketId).emit("asigned_pm");
                }
            }
        }
    }) 

    socket.on("pm_desition",data=>
    {//desde el cliente que es el pm actual, decreq.params.idio que descartar
        socket.dataBase.stack_descartados.push(data.descartada); //se guarda en la pila de descartados para remezclar mas adelante
        io.to(socket.dataBase.chancellor.socketId).emit("chancellor_turn",{cartas:data.cartas}) //evento para todos que le toca al chancellor votar
    }) 

    socket.on("chancellor_desition",data=>//desde el cliente del chancellor actual, decreq.params.idio que descartar
    {
        socket.dataBase.stack_descartados.push(data.descartada);
        lawCounter(data.selected,socket);
        socket.dataBase.last_elected=[socket.dataBase.pm,socket.dataBase.chancellor]; //guardo los ultimos elegidos
        var winner = determine_winner("just_decided",socket); //si ganan fascistas por cantidad de leyes rojas o liberales por cantidad de leyes azules
        if(winner!=false) //si hay un ganador 
        {
            if(winner==BLUE){socket.dataBase.jugadores.forEach(element=>
                {
                    io.to(element.socketId).emit("blue_wins",element.position)
                });}
                else
                {socket.dataBase.jugadores.forEach(element=>
                {
                    io.to(element.socketId).emit("red_wins",element.position)
                });}
        } 
        io.to(socket.roomKey).emit("law_done",{selected:data.selected,counter:socket.dataBase[data.selected]}) //evento a todos para que vean que ley se paso
        nextTurn(socket);
        powerTurn(data,socket);    //se envia al analisis de poder al pm
    })
    
    socket.on(KILL_PLAYER,data=>
    {
        socket.dataBase.jugadores[data.position].estado="dead";
        socket.dataBase.jugadores.forEach(element => {
            if(element.position!=data.position){io.to(element.socketId).emit("assasination",data.position)}
        });
        io.to(data.socketId).emit("assasinated",socket.dataBase.jugadores[data.position].position)
        socket.dataBase.mod_total++;
        if(data.position==socket.dataBase.pm.position)
        {
            while(socket.dataBase.pm.estado=="dead")
            {
                if(socket.dataBase.pm.position==socket.dataBase.jugadores.length-1){socket.dataBase.pm=socket.dataBase.jugadores[0]}  //pasa al siguiente jugador para ser pm
                else{socket.dataBase.pm=socket.dataBase.jugadores[socket.dataBase.pm.position+1]}
            }
        }

        var stats_stack=statStack(socket);
        io.to(socket.roomKey).emit("next_turn",{next_pm:socket.dataBase.pm,stats:stats_stack}); //se envia a todos el nuevo pm con este evento 
        io.to(socket.dataBase.jugadores[socket.dataBase.pm.position].socketId).emit("asigned_pm");
    });

    socket.on(PICK_CANDIDATE,data=>
    {
        socket.dataBase.pm=socket.dataBase.jugadores[data.position];
        var stats_stack=statStack(socket);
        io.to(socket.roomKey).emit("next_turn",{next_pm:socket.dataBase.pm,stats:stats_stack}); //se envia a todos el nuevo pm con este evento 
        io.to(socket.dataBase.jugadores[socket.dataBase.pm.position].socketId).emit("asigned_pm");
    });

})

//Funciones Auxiliares:
function powerTurn(data,socket)
{
    if(data.selected==RED)
    {
        if(!determinePower(socket)) //determina si la ley tiene un poder que para que el juego continue, el pm necesita enviar info
        {
            var stats_stack=statStack(socket);
            io.to(socket.roomKey).emit("next_turn",{next_pm:socket.dataBase.pm,stats:stats_stack}); //se envia a todos el nuevo pm con este evento 
            io.to(socket.dataBase.jugadores[socket.dataBase.pm.position].socketId).emit("asigned_pm");
        } 
    }
    else    //La carta no es roja
    {   
        var stats_stack=statStack(socket);
        io.to(socket.roomKey).emit("next_turn",{next_pm:socket.dataBase.pm,stats:stats_stack}); //se envia a todos el nuevo pm con este evento 
        io.to(socket.dataBase.jugadores[socket.dataBase.pm.position].socketId).emit("asigned_pm");
    }
}

function determinePower(socket)
{
    var reciever=socket.dataBase.last_elected[0];
    var client_command=socket.dataBase.board["position_"+socket.dataBase.red];
    switch (client_command) 
    {
        case EXAMINE_DECK:  
            var trio_cartas=[];
            for(var i=0;i<3;i++) //obtengo las 3 cartas que se le envia al pm
            {
                if(socket.dataBase.stack_cartas.length==0){socket.dataBase.stack_cartas=shuffle(socket.dataBase.stack_descartados)}
                trio_cartas.push(socket.dataBase.stack_cartas.pop())
            }
            io.to(reciever.socketId).emit(EXAMINE_DECK,trio_cartas);
            trio_cartas.forEach(element=>{socket.dataBase.stack_cartas.push(element)})
        return false;

        case KILL_PLAYER:
            io.to(reciever.socketId).emit(KILL_PLAYER,socket.dataBase.jugadores);
        return true;

        case EXAMINE_PLAYER:
            io.to(reciever.socketId).emit(EXAMINE_PLAYER,socket.dataBase.jugadores);
        return false;

        case PICK_CANDIDATE:
            io.to(reciever.socketId).emit(PICK_CANDIDATE,socket.dataBase.jugadores);
        return true;
    
        default:
        return false
    }
    /*EXAMINE_DECK KILL_PLAYER EXAMINE_PLAYER PICK_CANDIDATE*/
}

function makeKey(length=5) 
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function hash(roomKey)
{
    var rawKey=0;
    for(var i=0; i<roomKey.length;i++)
    {rawKey = rawKey + roomKey.charCodeAt(i);}
    return rawKey%20;
}

function createDataBase()
{
    const roomKey=makeKey(5); //Genero llave
    const roomId=hash(roomKey); //index
    if(typeof dataBase[roomId] == "object") //chequeo si esta ese objeto inicializado
    {
        if(dataBase[roomId].hasOwnProperty(roomKey)) //si existe esta key
        {
            if(dataBase[roomId][roomKey].jugadores.length==0) // Y no esta en uso
            {
                dataBase[roomId][roomKey]= new roomDataBase();
                console.log(dataBase[roomId][roomKey])
                return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]};
            }
        }
        else
        {
            dataBase[roomId][roomKey]=new roomDataBase(); //creo una copia de obj
            console.log(dataBase[roomId][roomKey])
            return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]}; //devuelvo toda la informacion necesaria
            
        }
    }
    else
    {
        dataBase[roomId]={};
        dataBase[roomId][roomKey]=new roomDataBase();
        console.log(dataBase[roomId][roomKey])
        return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]};
    }
    
}

function assignDataBase(roomKey,roomId)
{
    if(dataBase[roomId].hasOwnProperty(roomKey))
    {
        return dataBase[roomId][roomKey]
    }
}

function cardStackGenerator(socket)
{
    socket.dataBase.stack_cartas=shuffle([BLUE,RED,RED,RED,RED,RED,BLUE,RED,BLUE,RED,RED,BLUE,BLUE,RED,RED,RED,BLUE])
} 

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function determine_winner(comm,socket)
{

    if(socket.dataBase.blue==WINS_BLUE){return BLUE}
    else if(socket.dataBase.red==WINS_RED){return RED}
    else if(socket.dataBase.red>=MIN_RED_H && socket.dataBase.chancellor.rol==H && comm=="h_chancellor"){return RED}
    else{return false}
}

function nextTurn(socket)
{
    if(socket.dataBase.pm.position==socket.dataBase.jugadores.length-1){socket.dataBase.pm=socket.dataBase.jugadores[0]}  //pasa al siguiente jugador para ser pm
    else{socket.dataBase.pm=socket.dataBase.jugadores[socket.dataBase.pm.position+1]}
    while(socket.dataBase.pm.estado=="dead")
    {
        if(socket.dataBase.pm.position==socket.dataBase.jugadores.length-1){socket.dataBase.pm=socket.dataBase.jugadores[0]}  //pasa al siguiente jugador para ser pm
        else{socket.dataBase.pm=socket.dataBase.jugadores[socket.dataBase.pm.position+1]}
    }
    socket.dataBase.chancellor={}; //se borra el chancellor
}

function lawCounter(selected,socket)
{
    if(selected==BLUE){socket.dataBase.blue++}
    else{socket.dataBase.red++}
}

function statStack(socket)
{
    return {
        blue:socket.dataBase.blue,
        red:socket.dataBase.red,
        cant_left:socket.dataBase.stack_cartas.length,
        cant_descart:socket.dataBase.stack_descartados.length,
        pm_pos:socket.dataBase.pm.position,
        skipped_turns:socket.dataBase.skipped,
        last_elected:socket.dataBase.last_elected
    }
}

function initGame(socket)
{
    generateRol(socket);
    generateBoard(socket);
    socket.dataBase.cant_jugadores=socket.dataBase.jugadores.length;
    socket.dataBase.pm_pos=0;
    cardStackGenerator(socket);
    socket.dataBase.stack_descartados=[];
    socket.dataBase.blue=0;
    socket.dataBase.red=0;
    socket.dataBase.chancellor={};
    socket.dataBase.pm=socket.dataBase.jugadores[0];
    socket.dataBase.passed=0;
    socket.dataBase.last_elected=[socket.dataBase.jugadores[0],socket.dataBase.jugadores[0]],
    socket.dataBase.mod_total=0;
    socket.dataBase.jugadores.forEach(element =>
    {element.estado="alive";});
    resetVotos(socket);
}

function generateBoard(socket)
{
    if(socket.dataBase.jugadores.length<7)
    {
        socket.dataBase.board.position_3=EXAMINE_DECK;
        socket.dataBase.board.position_4=KILL_PLAYER;
        socket.dataBase.board.position_5=KILL_PLAYER;
    }
    else if(socket.dataBase.jugadores.length<9)
    {
        socket.dataBase.board.position_2=EXAMINE_PLAYER;
        socket.dataBase.board.position_3=PICK_CANDIDATE;
        socket.dataBase.board.position_4=KILL_PLAYER;
        socket.dataBase.board.position_5=KILL_PLAYER;
    }
    else
    {
        socket.dataBase.board.position_1=EXAMINE_PLAYER;
        socket.dataBase.board.position_2=EXAMINE_PLAYER;
        socket.dataBase.board.position_3=PICK_CANDIDATE;
        socket.dataBase.board.position_4=KILL_PLAYER;
        socket.dataBase.board.position_5=KILL_PLAYER;
    }


}

function resetVotos(socket)
{
    socket.dataBase.votos.positivos=0;
    socket.dataBase.votos.total=0;
}

function generateRol(socket)
{   //EN ESTE CASO DE DEMO PARA 2, NO PUEDO TESTEAR, TESTEARE MAS TARDE, AHORA HARDCODEO
    //CANT_FASC, CANT_LIBS
    /*socket.dataBase.jugadores[0].rol=LIB;
    socket.dataBase.jugadores[1].rol=H;*/
    var raw=[];
    if(socket.dataBase.jugadores.length<=5){raw=shuffle([H,FASC,LIB,LIB,LIB]);}
    else if(socket.dataBase.jugadores.length==6){raw=shuffle([H,FASC,LIB,LIB,LIB,LIB]);}
    else if(socket.dataBase.jugadores.length==7){raw=shuffle([H,FASC,LIB,LIB,LIB,LIB,FASC]);}
    else if(socket.dataBase.jugadores.length==8){raw=shuffle([H,FASC,LIB,LIB,LIB,LIB,FASC,LIB]);;}
    else if(socket.dataBase.jugadores.length==9){raw=shuffle([H,FASC,LIB,LIB,LIB,LIB,FASC,FASC,LIB]);}
    else if(socket.dataBase.jugadores.length==10){raw=shuffle([H,FASC,LIB,LIB,LIB,LIB,FASC,FASC,LIB,LIB]);}
    for(var j=0;j<socket.dataBase.jugadores.length;j++)
    {socket.dataBase.jugadores[j].rol=raw[j];}
}
