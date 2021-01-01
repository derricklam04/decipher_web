import React, {useState, useEffect} from 'react';
import {Card} from './Card'
import { Form } from './Form'


export const CardStack = () => {

    const [cards, setCards] = useState([])
    const [addCard, setAddCard] = useState('')

    useEffect(()=>{
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    },[])

    const handleFormChange = (inputValue) => {
        setAddCard(inputValue)
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content:addCard
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(message=> {
                console.log(message)
                setAddCard('')
                updateCardStack()
        })
    }

    const updateCardStack = () => {
        fetch('/api').then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    }

    const handleCardClick = (cardContent) => {
        setAddCard(cardContent)
    }

    return (
        <div>
            <Form userInput={addCard} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <Card cards={cards} onCardClick={handleCardClick}/>
        </div>
    )
}