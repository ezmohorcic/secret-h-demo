import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewsBox } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove, faCrow} from '@fortawesome/free-solid-svg-icons';


export default function NewsBox()
{
    const dispatch=useDispatch();
    const newsBox=useSelector((state)=>state.newsBox);

    let innerInfo={};

    switch (newsBox.title) {
        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "chancellor_chosen":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="A chancellor has been chosen, it's your momento to decide";
            innerInfo.img=faCrow;
        break;

        case "asigned_pm":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Now it's your turn in power, use it with discretion";
            innerInfo.img=faCrow;
        break;

        case "duo_won":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Results are clear, the president and chancellor will take power now";
            innerInfo.img=faCrow;
        break;

        case "duo_lost":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Until the popular opinion says otherwise, president and chancellor weren't elected";
            innerInfo.img=faCrow;
        break;

        case "law_done":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Chancellor and President made their decition, a new law has been stablished";
            innerInfo.img=faCrow;
        break;

        case "examine_deck":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Before leaving office, you have a vivid vision of what is to come.";
            innerInfo.img=faCrow;
        break;

        case "kill":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You have to maintain your power, and those who defy you must die.";
            innerInfo.img=faCrow;
        break;

        case "examine_player":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Your spies are ready and waiting, just point who to investigate.";
            innerInfo.img=faCrow;
        break;

        case "pick_candidate":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="Beign in power means  trying to perpetuate your influence, and that means to choose your succesor";
            innerInfo.img=faCrow;
        break;

        case "assasinated":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "assasination":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;
    
        case "rest_know_examine_deck":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="The president knows the posible futures of the nation";
            innerInfo.img=faCrow;
        break;

        case "rest_know_examine_player":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="The president uses their spies to know the identity of:";
            innerInfo.img=faCrow;
        break;
        
        case "rest_know_pick_candidate":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="A handshake seals the destiny of the nation, the next president will be:";
            innerInfo.img=faCrow;
        break;
        
        case "rest_know_kill":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="A bullet is heared in a dark alley, has been murdered.";
            innerInfo.img=faCrow;
        break;
        
        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "deathy":
            innerInfo.display={display:"none"}
        break;

        default:
        break;    
    }
    console.log(innerInfo);
    return(
        <p>{innerInfo.flavorText}</p>
    )
}

