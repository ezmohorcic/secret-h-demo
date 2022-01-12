export function setAllPlayer_data (payload)
{
    return({type:"YOUR_DATA",payload:payload})
}

export function setPlayer_position(payload)
{
    return({type:"NEW_POSITION",payload:payload})
}

export function soyCeroFalse(payload)
{
    return({type:"DEJO_SERLO",payload:payload})
}

export function soyCeroTrue(payload)
{
    return({type:"SOY_CERO",payload:payload})
}

export function setStats_turno(payload)
{
    return({type:"NEW_STATS",payload:payload})
}

export function setKnownRols(payload)
{
    return({type:"NEW_KNOWN",payload:payload})
}

export function unAlive(payload)
{
    return({type:"ASESINADO",payload:payload})
}
