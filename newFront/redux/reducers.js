import { combineReducers } from "redux";

const initialState = 
{
    all_players: [],
    player_data: {
        username: "",                   
        pos: null,
        socketId: null,          
        rol:"",
        estado:"vivo"   
    },
    soyCeroView: false,
    stats_turno:{},
    alive:true,
    knownRols:[],
    test:{}
};

function all_players(state=[],action)
{
    if (action.type =="NEW_PLAYER")return[...state,action.payload]
    else if(action.type =="NEW_POSITION_NAME")
    {
        let nwArr= state.map(player=>
            {
                let copyPlayer={...player};
                if(copyPlayer.position==action.payload.position){copyPlayer.username=action.payload.username}
                return copyPlayer;
            });
        return nwArr
    }
    else if(action.type=="ASSASINATION")
    {
        let nwArr= state.map(player=>
            {
                let copyPlayer={...player};
                if(copyPlayer.position==action.payload.position){copyPlayer.estado="dead"}
                return copyPlayer;
            });
        return nwArr 
    }
    else if(action.type=="ALL_PLAYERS"){return action.payload}
    else return state
}

function player_data(state=initialState.player_data,action)
{
    if(action.type=="YOUR_DATA"){return action.payload}
    else if(action.type=="YOUR_ROL"){return {...state,rol:action.payload}}
    else if(action.type=="NEW_POSITION"){return {...state,position:action.payload}}
    else if(action.type=="NEW_USERNAME"){return {...state,username:action.payload}}
    else {return state}
}

function soyCeroView(state=initialState.soyCeroView,action)
{
    if(action.type=="SOY_CERO"){return true}
    else if(action.type=="DEJO_SERLO"){return false}
    else {return state}
}

function stats_turno(state=initialState.stats_turno,action)
{
    if(action.type=="NEW_STATS"){return action.payload}
    else {return state}
}

function knownRols (state=initialState.knownRols,action)
{
    if(action.type=="NEW_KNOWN")return [...state,action.payload]
    else {return state}
}

function alive(state=initialState.alive,action)
{
    if(action.type=="ASESINADO"){return false}
    else {return state}
}

function next_pm(state={},action)
{
    if(action.type=="NEXT_PM"){return action.payload;}
    else return state;
}

const rootReducer=combineReducers({
    all_players,
    player_data,
    soyCeroView,
    stats_turno,
    knownRols,
    alive,
    next_pm
});

export default rootReducer;