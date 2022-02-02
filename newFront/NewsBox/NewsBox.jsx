import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewsBox } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove, faCrow} from '@fortawesome/free-solid-svg-icons';

import './NewsBox.css';

let gunShot = new Audio('../Sounds/GunShotSilencer.mp3');
let fotoSound = new Audio('../Sounds/35mmCameraAutoWin.mp3');
let pickCandidateSound = new Audio('../Sounds/ConcertBassDrum.mp3');
let otherExamDeckSound = new Audio('../Sounds/Soundstorm.mp3');
let next_turnSound = new Audio('../Sounds/next_turn.mp3');
let trainWhistleSound = new Audio('../Sounds/train_whistle.mp3');
let duoWon = new Audio('../Sounds/duoWon.mp3');
let newChancellorSound = new Audio('../Sounds/new_chancellor.mp3');
let lawDoneSound = new Audio('../Sound/ChurchBellRinging.mp3');
let duoLost = new Audio('../Sounds/duoWon.mp3');
let deckExamSound = new Audio('../Sounds/Whoosh.mp3');
let killSelectSound = new Audio('../Sounds/GunCockSingle.mp3');
let playerExamSound = new Audio('../Sounds/tap.mp3');
let bookMovement = new Audio('../Sounds/bookMovement.mp3');
let chairPresidentAssigned = new Audio('../Sounds/chairPresidentAssigned.mp3');
let LetterOpener = new Audio('../Sounds/LetterOpener.mp3');


export default function NewsBox()
{
    const newsBox=useSelector((state)=>state.newsBox);
    const soundEffects=useSelector((state)=>state.soundEffects);

    let innerInfo={};
    let arrVotes=[];

    
    switch (newsBox.title) {
        case "next_turn":
            console.log(newsBox.payload)
            arrVotes= Object.getOwnPropertyNames(newsBox.payload.eachVote).map((element,index)=>
            {
                return(
                    <li key={"vote"+index}>{element}:{newsBox.payload.eachVote[element]}</li>
                )
            });
            innerInfo.flavorText=(
                <React.Fragment>
                    <p id="newsBoxFlavor">A new turn begins. Pre-elected President: {newsBox.payload.next_pm.username}</p>
                    <ul id='allVotesShell'>{arrVotes}</ul>
                </React.Fragment>
            );
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The next in position took the pre-elected President title and has to choose chancellor.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){next_turnSound.play();}
        break;

        case "init_game":
            if(soundEffects){trainWhistleSound.play();}
        break;

        case "you_chancellor":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">You've been selected by the president, you'll become his chancellor.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(You'll act as chancellor this turn, you'll recieve two cards from the president adter he discarted one of the three he gets front the stack.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){LetterOpener.play();}
        break;

        case "chancellor_chosen":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">A chancellor has been chosen, it's your moment to decide.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The president selected chancellor, vote if you want them to pass a law this turn.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){newChancellorSound.play();}
        break;

        case "asigned_pm":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">Now it's your turn in power, use it with discretion.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(You have to choose a chancellor to pass a law this turn.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){chairPresidentAssigned.play();}
        break;

        case "duo_won":
            
            arrVotes= Object.getOwnPropertyNames(newsBox.eachVote).map((element,index)=>
            {
                return(
                    <li key={"vote"+index}>{element}:{newsBox.eachVote[element]}</li>
                )
            });
            innerInfo.flavorText=(
                <React.Fragment>
                    <p id="newsBoxFlavor">Results are clear, the president and chancellor will take power now.</p>
                    <ul id='allVotesShell'>{arrVotes}</ul>
                </React.Fragment>
            );
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The majority voted in favor of the duo president-chancellor, the president will take 3 cards from stack, discard one, chancellor wil do the same with the 2 left.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){duoWon.play();}
        break;

        case "duo_lost":
            console.log(newsBox);
            arrVotes= Object.getOwnPropertyNames(newsBox.eachVote).map((element,index)=>
            {
                return(
                    <li key={"vote"+index}>{element}:{newsBox.eachVote[element]}</li>
                )
            });
            console.log(arrVotes)
            innerInfo.flavorText=(
                <React.Fragment>
                    <p id="newsBoxFlavor">Until the popular opinion says otherwise, president and chancellor won't elected.</p>
                    <ul id='allVotesShell'>{arrVotes}</ul>
                </React.Fragment>
            );
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The majority voted against of the duo president-chancellor, the next position becomes pre-elected president.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){duoLost.play();}
        break;

        case "law_done":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">Chancellor and President made their decition, a new law has been stablished.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(Both president and chancellor discarted one law, the remaining one was played.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){lawDoneSound.play();}
        break;

        case "examine_deck":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">Before leaving office, you have a vivid vision of what is to come.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(You can see the next three laws of the stack, remember them and click "close".)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){deckExamSound.play();}
        break;

        case "kill":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">You have to maintain your power, and those who defy you must die.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(You can choose one other player to kill, that player cant participate until the next game, tell the other players you have this decition to make!.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){killSelectSound.play();}
        break;

        case "examine_player":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">Your spies are ready and waiting, just point who to investigate.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(Select another player to reveal, just to yourself, their rol (liberal, fascist, hitler).)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){playerExamSound.play();}
        break;

        case "pick_candidate":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">Being in power means trying to perpetuate your influence, and that means to choose your succesor.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(Choose the next president candidate (this will skip those players between you and the selected player).)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){bookMovement.play();}
        break;

        case "assasinated":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">You've been executed.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The president killed you.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){gunShot.play();}
        break;

        case "assasination":
            console.log(newsBox.payload)
            innerInfo.flavorText=<p id="newsBoxFlavor">A bullet is heared in a dark alley, <span style={{fontStyle:"italic",fontWeight:"bolder"}}>{newsBox.payload.username}</span>  has been murdered.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The president killed a player.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){gunShot.play();}
        break;
    
        case "rest_know_examine_deck":
            
            innerInfo.flavorText=<p id="newsBoxFlavor">{newsBox.payload.presidentUsr} knows the posible futures of the nation.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>({newsBox.payload.presidentUsr} knows the next three laws of the stack.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){otherExamDeckSound.play();}
        break;

        case "rest_know_examine_player":
            console.log(newsBox.payload)
            innerInfo.flavorText=<p id="newsBoxFlavor">{newsBox.payload.presidentUsr} uses their spies to know the identity of: <span style={{fontStyle:"italic",fontWeight:"bolder"}}>{newsBox.payload.username}</span>.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>({newsBox.payload.presidentUsr} knows the rol of the selected player (liberal, fascist, hitler).)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){fotoSound.play();}
        break;
        
        case "rest_know_pick_candidate":
            console.log(newsBox.payload)
            innerInfo.flavorText=<p id="newsBoxFlavor">A handshake seals the destiny of the nation, the next president will be: <span style={{fontStyle:"italic",fontWeight:"bolder"}}>{newsBox.payload.username}</span>.</p>;
            innerInfo.aclaration=<p id='newsBoxAclaration'>(The {newsBox.payload.presidentUsr} chose the next pre-selected President.)</p>;
            innerInfo.img=faCrow;
            if(soundEffects){pickCandidateSound.play();}
        break;
        
        /*case "rest_know_kill":
            setDisp({display:"block"});
            innerInfo.flavorText="A bullet is heared in a dark alley, has been murdered.";
            innerInfo.aclaration="(.)";
            innerInfo.img=faCrow;
        break;*/

        default:
        break;    
    }
    return(
        <div style={newsBox.disp} id='newsBoxContainer'>
            <div id='newsBoxBorder'>
                <div id='newsBoxFlavorShell'>
                    {innerInfo.flavorText}
                </div>
                <div id='newsBoxAclarationShell'>
                    {innerInfo.aclaration}
                </div>
            </div>
        </div>
        
    )
}

