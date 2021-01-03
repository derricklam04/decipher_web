import React, {useState, useEffect, useReducer} from 'react';
import { HistoryCard } from './HistoryCard'
import { InputForm } from './InputForm'
import { Row, Col } from 'react-bootstrap'



export const CardStack = () => {

    const [cards, setCards] = useState([])
    const [type, setType] = useState('#encrypt')

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state,  ...newState}),
        {
            addCard: '',
            key: '',
            keyLength: '',
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
        const {name, value} = event.target;
        setUserInput({[name]:value})
    }

    const handleFormSubmit = () => {
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: userInput.addCard,
                key: userInput.key,
                keyLength: userInput.keyLength,
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
        setUserInput({keyLength: ''});
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

    const handleToggle = (event) => {
        setType(event)
    }

    return (
        <div>
            <Row>
            <Col md={9}>
                <InputForm userInput={userInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} onFormClear={handleFormClear} onToggle={handleToggle}/>
            </Col>
            <Col md={3}>                
                <HistoryCard cards={cards} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
            </Col>
            </Row>
            <br />
            
            
        </div>
    )
}