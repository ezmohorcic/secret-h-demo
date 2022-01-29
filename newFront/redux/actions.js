//--Client player_data effects
export function setAllPlayer_data (payload)
{
    return({type:"YOUR_DATA",payload})
}

export function setYou_chancelor(payload)
{
    console.log("setYou_chacellor")
    return({type:"YOU_CHANCELLOR",payload})
}

export function setPlayer_position(payload)
{
    return({type:"NEW_POSITION",payload:payload})
}

export function setPlayer_username(payload)
{
    return({type:"NEW_USERNAME",payload:payload})
}

export function setPlayer_rol(payload)
{
    return({type:"YOUR_ROL",payload})
}

export function unAlive()
{
    return({type:"ASESINADO",payload:false})
}

//--- Array of players effects

export function setOtherPlayer_Death(payload)
{
    return({type:"ASSASINATION",payload})
}

export function setOtherPlayer_name(payload)
{
    //console.log(payload)
    return({type:"NEW_POSITION_NAME",payload})
}

export function setAll_players(payload)
{
    
    return({type:"ALL_PLAYERS",payload})
}

export function setNew_player(payload)
{
    return({type:"NEW_PLAYER",payload})
}

//--- Init game button view

export function soyCeroFalse(payload)
{
    return({type:"DEJO_SERLO",payload})
}

export function soyCeroTrue(payload)
{
    return({type:"SOY_CERO",payload})
}

//--- State of stats effects

export function setStats_turno(payload)
{
    return({type:"NEW_STATS",payload})
}

export function setLast_elected(payload)
{
    return({type:"CHANGE_LAST_ELECTED",payload})
}

export function setKnownRols(payload)
{
    return({type:"NEW_KNOWN",payload})
}

export function setNext_pm(payload)
{
    return({type:"NEXT_PM",payload})
}

export function setNext_chancelor(payload)
{
    return({type:"NEXT_CHANCELLOR",payload})
}

//---Rooms actions

export function roomNumber(payload)
{
    return({type:"ROOM_NUMBER",payload})
}

export function unit(payload)
{
    return({type:"UNIT",payload})
}

//---LightBox

export function setNewsBox(payload){
    return({type:"ACTIVE_NEWS",payload:payload})
}