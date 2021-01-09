import React, {useState, useEffect, useReducer} from 'react';
import { HistoryCard } from './HistoryCard'
import { InputForm } from './InputForm'
import {Settings} from './Settings'
import { Row, Col, Card, Nav, Navbar, Tab, Tabs} from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'


export const Home = () => {

    const [cards, setCards] = useState([])
    const [type, setType] = useState('#encrypt')
    const [save, setSave] = useState(true)

    const [ic, setIc] = useState(0.615)
    const [freqTable, setFreqTable] = useState("wiki")

    const [keyError, setKeyError] = useState(false)
    const [lengthError, setLengthError] = useState(false)


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
        if(name==="key" && value===""){
            setKeyError(false)
        }
        if(name==="keyLength" && value===""){
            setLengthError(false)
        }
    }

    const handleFormSubmit = () => {
        var sendJob = true
        if (/[^a-zA-Z]/.test(userInput.key)){
            setKeyError(true)
            sendJob =false
        }else{
            setKeyError(false)
        }
        if(isNaN(userInput.keyLength)){
            setLengthError(true)
            sendJob =false
        }else{
            setLengthError(false)
        }

        if(sendJob){
            fetch('/api/create', {
                method: 'POST',
                body: JSON.stringify({
                    content: userInput.addCard,
                    key: userInput.key,
                    keyLength: userInput.keyLength,
                    type: type,
                    save: save,

                    ic: ic,
                    freqTable: freqTable
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
    }

    const handleFormClear = () => {
        setUserInput({addCard: ''});
        setUserInput({key: ''});
        setUserInput({keyLength: ''});
        setUserInput({translated: ''});
        setLengthError(false)
        setKeyError(false)

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

    const handleClearKey = () => {
        setUserInput({keyLength: ''});
    }

    const handleIcChange = (icChange) => {
        setIc(icChange/1000)
        console.log(icChange)
    }

    const handleFreqChange = (event) => {
        setFreqTable(event)
        console.log(event)
    }

    return (
        <div className="home-wrapper">
            <Row className="home">
                <Col md={8} className="inputForm">
                    <InputForm userInput={userInput} setUserInput={setUserInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} 
                    onFormClear={handleFormClear} onToggle={handleToggle} onSwap={handleSwap} onSwitch={handleSwitch} onClearKey={handleClearKey} 
                    onKeyError={keyError} onLengthError={lengthError}/>
                </Col>

                <Col className="tabs" >      
                    <Tabs className="tabs-header"defaultActiveKey="history" id="uncontrolled-tab-example"  >
                        <Tab eventKey="history" title="History" style={{ width: "auto", height: window.innerHeight-166, paddingRight:0}}>
                            <PerfectScrollbar>
                                <Card.Body>
                                <HistoryCard cards={cards} type={type} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
                                </Card.Body>
                            </PerfectScrollbar>
                        </Tab>
                        <Tab eventKey="advanced" title="Advanced Settings" style={{ width: "auto", height: window.innerHeight-166, paddingRight:0}}>
                            <Settings onIcChange={handleIcChange} onFreqChange={handleFreqChange} freqTable={freqTable}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <br />
        </div>
    )
}