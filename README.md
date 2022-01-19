# secret-h-demo

## Presentacion
Bienvenido al ReadMe de esta Demo! 
Primero me presento, me podes llamar Ivanna, y soy quien escribio todo el codigo que contiene esta carpeta, este juego no es de mi creacion, y mucho menos debo ser la primera que ha hecho este juego para Browser, pero, ¿Por que Secret Hitler?, la respuesta es sencilla, conoci este juego de mesa entre clases de facultad y me enamore de la sustancial mejora comparado a un juego similar que conocia, "La Mafia", y al tener reglas escritas y mucha profundidad y estrategia, aprendi a querer mucho este juego, y con el tiempo, mientras daba mis primeros pasos en la programacion web en medio de una pandemia, añoraba esos momentos de conexion con otras personas mientras nos traicionabamos entre nosotros y jugabamos a ver quien podia ser el mejor... _Hitler Secreto!_


## Back-End Code

### Overview 
Tendriamos que iniciar sobre las tecnologias que estuve utilizando y porque las utilice:

* _Express_: un paquete que, para mi, es casi una necesidad en todo servidor, me permite, en algunas lineas de codigo, tener una SPA (Single Page Application) de manera muy sencilla, y dentro del codigo del Front-End, encargarse del Routing. 

* _Socket.Io_: Sin este regalo de los Dioses, este proyecto se hubiera venido a bajo rapidamente, esta libreria te da la posibilidad de hacer muchas cosas geniales, pero en particular, da la posibilidad de generar eventos desde el servidor, efectivamente permitiendo manejar, de maner asincronica, eventos en un cliente que otro _triggereo_ desde su UI.

Como explique arriba, la idea inicial, y la que fue el hilo conductor de este proyecto, fue poder comunicarse entre jugadores a traves de eventos, esto es debido a la naturaleza asincronica de la interaccion con usuarios. 

### Codigo de Servidor

```javascript
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
```

Arriba podemos obserbar un codigo mas bien basico, utilizando _ejs_ como viewer, utilizo un .HTML unico guardado en en _./newFront_ que devuelvo entrando en la pagina raiz. A continuacion iniciamos el servidor e inicializo los sockets con la function socketio.

La estructura general de Socket.Io en el servidor va de esta manera generica:

```javascript
socket.on("evento_desde_un_cliente",data=> //El metodo on se llama cuando recibe un evento
    {
        //Logica en el evento
        io.emit("evento_desde_server",{metodo:payload}) //puede devolver una emision desde servidor a ciertos clientes 
    });
```

Cada uno de estos distintos eventos que maneja el servidor son contenidos dentro de _io_ de manera que cuando alguien se conecte, se instancie un nuevo _socket_ unico, en la cual se puede guardar informacion a modo de propiedades que solo se pueden acceder cuando el evento sea de ese usuario.

```javascript
io.on('connection', socket => 
{
    socket.on(...)
});
```

Pero, ¿Como hice para que puedas tener multiples salas y multiples juegos a la vez?

```javascript
socket.join(data);
```

Socket.Io introduce el concepto de _rooms_, de esta manera, podes asignarle a cada usuario un room a pedido, que va a representar la sala en donde van a estar jugando, y adelantandome al hecho, esta sala va a tambien ser una URL dinamica por la cual va a dar una experiencia mejor de cara al UI. 

### Especificaciones a Profundidad

Ahora que aclaramos algunas bases, ensuciemosnos las manos y diseccionemos este liber...este codigo un poco mejor. Si prestas atencion, podemos observar que para guardar los datos de cada partida en curso utilizo un objeto con todas sus propiedades cargadas 

este va de la siguiente manera, y contiene toda la informacion necesaria para que cada sala sea independiente:

```javascript
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
}
```

Cada vez que se crea una sala, se genera una Key aleatoria, y utilizo una modesta funcion hash, y la almaceno en una Hash-Table, devolviendo no solo una referencia a este objeto particular, sino tambien la Key y el Index para ser almacenado en la variable _socket_. Esto lo logro con estos pasos:

```javascript
socket.on("new_room",data=>
    {

        const roomdata=createDataBase();
        io.to(socket.id).emit("join_room",roomdata.roomKey) 
    });

function createDataBase()
{
    const roomKey=makeKey(5);
    const roomId=hash(roomKey);
    if(typeof dataBase[roomId] == "object")
    {
        if(dataBase[roomId].hasOwnProperty(roomKey))
        {
            if(dataBase[roomId][roomKey].jugadores.length==0)
            {
                dataBase[roomId][roomKey]={...obj};
                return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]};
            }
        }
        else
        {
            dataBase[roomId][roomKey]={...obj};
            return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]};
        }
    }
    else
    {
        dataBase[roomId]={};
        dataBase[roomId][roomKey]={...obj}
        return{roomKey,roomId,dataBase:dataBase[roomId][roomKey]};
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
```

Y en el momento que alguien mas se conecte, o despues de haberse creado, se recurre a:

```javascript
socket.on("join_room",data=>
{
    socket.roomKey = data;
    socket.roomId=hash(data);
    socket.dataBase=assignDataBase(data,socket.roomId);
    socket.join(data);
    socket.username = "Anon";
    socket.position = socket.dataBase.jugadores.length;
    socket.dataBase.cant_jugadores++;
    socket.dataBase.jugadores.push({username:socket.username,position:socket.position,socketId:socket.id,estado:"vivo",rol:""}) 
    
    io.to(socket.roomKey).emit('new_player', socket.dataBase.jugadores) //evento que indica que se debe agregar nuevo usuario en la posicion
    io.to(socket.id).emit("your_data",{username:socket.username,position:socket.position,socketId:socket.id,estado:"vivo",rol:"",sala:socket.roomKey}) //le envia la informacion propia del jugador a su front
});

function assignDataBase(roomKey,roomId)
{
    if(dataBase[roomId].hasOwnProperty(roomKey))
    {
        return dataBase[roomId][roomKey]
    }
}
```

Y a partir de este momento, el usuario en posicion 0 va a poder dar inicio al juego en cualquier momento. Y yendo a cada llamada, voy a listar abajo que haria cada una de ellas
Creo que anotaciones y comentarios dentro del codigo de por si son suficientes para esclarecer cualquier otra duda que pueda generarte la logica, que debo admitir, es algo rebuscada 