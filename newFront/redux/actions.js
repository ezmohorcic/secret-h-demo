//--Client player_data effects
export function setAllPlayer_data (payload)
{
    console.log("setAllPlayer_data")
    console.log(payload)
    return({type:"YOUR_DATA",payload})
}

export function setPlayer_position(payload)
{
    return({type:"NEW_POSITION",payload:payload})
}

export function setPlayer_rol(payload)
{
    return({type:"NEW_ROL",payload})
}

export function unAlive(payload)
{
    return({type:"ASESINADO",payload})
}

//--- Array of players effects

export function setOtherPlayer_Death(payload)
{
    return({type:"ASSASINATION",payload})
}

export function setAll_players(payload)
{
    console.log(payload)
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

export function setKnownRols(payload)
{
    return({type:"NEW_KNOWN",payload})
}
