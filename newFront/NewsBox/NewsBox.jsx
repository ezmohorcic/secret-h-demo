import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewsBox } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove, faCrow} from '@fortawesome/free-solid-svg-icons';


export default function NewsBox()
{
    const dispatch=useDispatch();
    const newsBox=useSelector((state)=>state.newsBox);
    const [disp,setDisp]=useState({display:"none"});

    let innerInfo={};

    console.log(newsBox.title)
    switch (newsBox.title) {
        case "you_chancellor":
            setDisp({display:"block"});
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "chancellor_chosen":
            setDisp({display:"block"});
            innerInfo.flavorText="A chancellor has been chosen, it's your momento to decide.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "asigned_pm":
            setDisp({display:"block"});
            innerInfo.flavorText="Now it's your turn in power, use it with discretion.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "duo_won":
            setDisp({display:"block"});
            innerInfo.flavorText="Results are clear, the president and chancellor will take power now.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "duo_lost":
            setDisp({display:"block"});
            innerInfo.flavorText="Until the popular opinion says otherwise, president and chancellor weren't elected.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "law_done":
            setDisp({display:"block"});
            innerInfo.flavorText="Chancellor and President made their decition, a new law has been stablished.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "examine_deck":
            setDisp({display:"block"});
            innerInfo.flavorText="Before leaving office, you have a vivid vision of what is to come.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "kill":
            setDisp({display:"block"});
            innerInfo.flavorText="You have to maintain your power, and those who defy you must die.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "examine_player":
            setDisp({display:"block"});
            innerInfo.flavorText="Your spies are ready and waiting, just point who to investigate.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "pick_candidate":
            setDisp({display:"block"});
            innerInfo.flavorText="Being in power means trying to perpetuate your influence, and that means to choose your succesor.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "assasinated":
            setDisp({display:"block"});
            innerInfo.flavorText="You've been executed";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "assasination":
            setDisp({display:"block"});
            innerInfo.flavorText=`A bullet is heared in a dark alley, ${newsBox.payload.username} has been murdered.`;
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;
    
        case "rest_know_examine_deck":
            setDisp({display:"block"});
            innerInfo.flavorText="The president knows the posible futures of the nation.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;

        case "rest_know_examine_player":
            setDisp({display:"block"});
            innerInfo.flavorText="The president uses their spies to know the identity of: "+ newsBox.payload.username;
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;
        
        case "rest_know_pick_candidate":
            setDisp({display:"block"});
            innerInfo.flavorText="A handshake seals the destiny of the nation, the next president will be: "+ newsBox.payload.username;
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;
        
        /*case "rest_know_kill":
            setDisp({display:"block"});
            innerInfo.flavorText="A bullet is heared in a dark alley, has been murdered.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;*/

        case "deathy":
            setDisp({display:"none"});
        break;

        default:
            setDisp({display:"none"});
        break;    
    }
    console.log(innerInfo);
    return(
        <p>{innerInfo.flavorText}</p>
    )
}

