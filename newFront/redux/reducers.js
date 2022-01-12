import { all } from "express/lib/application";
import { combineReducers } from "redux";

const initialState = {
    all_players: [],
    player_data: {},
    soyCeroView: false,
    stats_turno:[],
    alive:true
};

function all_players(state=initialState,action)
{
    if (action.type =="NEW_PLAYER"){return{...state,all_players:[...state.all_players,action.payload]}}
    else if(action.type =="NEW_POSITION"){return{...state,all_players:action.payload}}
}

function player_data(state=initialState,action)
{
    if(action.type=="YOUR_DATA")
    {
        return {...state,player_data:action.payload}
    }
    else if(action.type=="YOUR_ROL")
    {
        return {...state,player:{...state.player_data,rol:action.payload}}
    }
    else if(action.type=="NEW_POSITION")
    {
        return {...state,player:{...state.player_data,position:action.payload}}
    }
}

function soyCeroView(state=initialState,action)
{
    if(action.type=="SOY_CERO"){return{...state,soyCeroView:true}}
    if(action.type=="DEJO_SERLO"){return{...state,soyCeroView:false}}
}

function stats_turno(state=initialState,action)
{
    if(action.type=="NEW_STATS"){return{...state,stats_turno:action.payload}}
}

function knownRols (state=initialState,action)
{
    if(action.type=="NEW_KNOWN"){return{...state,knownRols:[...state.knownRols,action.payload]}}
}

function alive(state=initialState,action)
{
    if(action.type=="ASESINADO"){return{...state,alive:false}}
}

const rootReducer=combineReducers({
    all_players:all_players,
    player_data:player_data,
    soyCeroView:soyCeroView,
    stats_turno:stats_turno,
    knownRols:knownRols,
    alive:alive
});

export default rootReducer;