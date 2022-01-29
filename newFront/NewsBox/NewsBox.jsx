import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setNewsBox } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove, faCrow} from '@fortawesome/free-solid-svg-icons';


export default NewsBox()
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

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;

        case "you_chancellor":
            innerInfo.display={display:"block"}
            innerInfo.flavorText="You've been selected by the president, you'll become his chancellor";
            innerInfo.img=faCrow;
        break;
    
        default:
        break;
    }

}