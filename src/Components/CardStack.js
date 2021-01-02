import React, {useState, useEffect, useReducer} from 'react';
import {Card} from './Card'
import { Form } from './Form'


export const CardStack = () => {

    const [cards, setCards] = useState([])
    const [type, setType] = useState('encode')

    // const [addCard, setAddCard] = useState('')
    // const [key, setKey] = useState('')
    // const [translatedText, setTranslatedText] = useState('')

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state,  ...newState}),
        {
            addCard: '',
            key: '',
            translated: ''
        }
    )
    

    useEffect(()=>{
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    },[])

    const handleFormChange = (event) => {
        // if (name === 'input'){
        //     setAddCard(inputValue)
        // }else if(name === 'output'){
        //     setTranslatedText(inputValue)
        // }

        const {name, value} = event.target;
        setUserInput({[name]:value})
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: userInput.addCard,
                key: userInput.key,
                type: type
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(message=> {
                console.log(message)
                setUserInput({translated: message['translatedText'] });
                updateCardStack()
        })
    }

    const handleFormClear = () => {
        setUserInput({addCard: ''});
        setUserInput({key: ''});
        setUserInput({translated: ''});

    }

    const updateCardStack = () => {
        fetch('/api').then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data => setCards(data))
    }

    const handleCardClick = (card) => {
        setUserInput({addCard: card.content});
        setUserInput({key: card.key});
        setUserInput({translated: card.translated});
    }

    const handleCardDelete = (cardID) =>{
        fetch('/api/'+cardID, {
            method: 'POST',
            body: JSON.stringify({
                id: cardID
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                updateCardStack()
        })
    }

    return (
        <div>
            <Form userInput={userInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} onFormClear={handleFormClear}/>
            <Card cards={cards} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
        </div>
    )
}