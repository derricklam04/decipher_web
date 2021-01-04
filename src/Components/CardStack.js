import React, {useState, useEffect, useReducer} from 'react';
import { HistoryCard } from './HistoryCard'
import { InputForm } from './InputForm'
import { Row, Col, Card, Nav, Navbar} from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'


export const CardStack = () => {

    const [cards, setCards] = useState([])
    const [type, setType] = useState('#encrypt')
    const [save, setSave] = useState(true)

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
                type: type,
                save: save
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(message=> {
                console.log(message)
                setUserInput({translated: message['translatedText'] });
                setUserInput({key: message['key'] });
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

    const handleSwap = () =>{
        var temp = userInput.addCard;
        setUserInput({addCard: userInput.translated});
        setUserInput({translated: temp});
    }

    const handleSwitch = () => {
        setSave(!save)
    }

    return (
        <div >
            <Row className="home">
                <Col md={8} className="inputForm">
                    <InputForm userInput={userInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} 
                    onFormClear={handleFormClear} onToggle={handleToggle} onSwap={handleSwap} onSwitch={handleSwitch}/>
                </Col>

                <Col className="history" >      
                    <Card style={{ width: "auto", height: '37rem', paddingRight:0}}>
                        <Card.Header  >
                            <Nav variant="tabs" defaultActiveKey="history">
                            <Nav.Item>
                                <Nav.Link href="history">History</Nav.Link>
                            </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <PerfectScrollbar>
                            <Card.Body>
                            <HistoryCard cards={cards} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
                            </Card.Body>
                        </PerfectScrollbar>
                        
                    </Card>
                </Col>
            </Row>
            <br />
        </div>
    )
}