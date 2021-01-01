import React, {useState, useEffect} from 'react';
import {Card} from './Card'

export const CardStack = () => {

    const [card, setCard] = useState([])

    useEffect(()=>{
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setCard(data))
    },[])

    return (
        <Card cards={card}/>
    )
}