import React, {useState, useEffect, useReducer} from 'react';
import { HistoryCard } from './HistoryCard'
import { InputForm } from './InputForm'
import {Settings} from './Settings'
import { ErrorModal } from './Modal/ErrorModal'
import { ResultsModal } from './Modal/ResultsModal'
import { WelcomeModal } from './Modal/WelcomeModal'
import { Switch } from './Buttons/Switch'

import PerfectScrollbar from 'react-perfect-scrollbar'
import Swal from "sweetalert2";  


import {ReactComponent as Setting} from '../Icons/settings.svg'
import {ReactComponent as History} from '../Icons/history.svg'

import { Row, Col, Card, Tab, Tabs} from 'react-bootstrap'

export const Home = ({onShowError, onShowResults}) => {
    
    const [showErrorModal, setErrorModal] = useState(false);
    const handleCloseError = () => setErrorModal(false);
    const handleShowError = () => {
        setResultsModal(false);
        onShowError()
    }
    const [showResultsModal, setResultsModal] = useState(false);
    const handleCloseResults = () => {
        setResultsModal(false);
        setResults([])
    }
    const handleShowResults = () => {
        // onShowResults()
        setResultsModal(true);
    }
    const [results, setResults] = useState([]);

    const [showWelcomeModal, setWelcomeModal] = useState(false);
    const handleCloseWelcome = () => {
        setWelcomeModal(false);
    }

    const [cards, setCards] = useState([]) // [{'content': 'hello', 'key': 'key', 'translated': 'translated'}]
    const [cardId, setCardId] = useState(0)
    const [type, setType] = useState('#decrypt')
    const [save, setSave] = useState(true)

    const [ic, setIc] = useState(0.0615)
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

    const [historyColor, setHistoryColor] = useState("black")
    const [settingColor, setSettingColor] = useState("#4287f5")
    const changeIconColor = (event) =>{
        if(event==="history"){
            setHistoryColor("black")
            setSettingColor("#4287f5")
        }else if(event ==="advanced"){
            setHistoryColor("#4287f5")
            setSettingColor("black")
        }
    }

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setUserInput({[name]:value})
        if(name==="key"){
            if(value==="")setKeyError(false);
            setUserInput({keyLength: ''});
        }
        if(name==="keyLength"){
            if(value==="")setLengthError(false);
            setUserInput({key: ''});
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
            if (type==='#decrypt' && userInput.key==="" && userInput.keyLength===""){
                handleShowResults();
            }
            fetch('api/create', {
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
                    if(message['error']==='true'){
                        handleShowError();
                    }else if(message['multiple']==='true'){
                        setResults(message['results'])
                    }else{
                        setResultsModal(false);
                        setUserInput({translated: message['translatedText'] });
                        setUserInput({key: message['key'] });
                        if (save){
                            addToCards(userInput.addCard, message['key'], message['translatedText'], type)
                        }
                    }
            })
        }
    }

    const addToCards = (addCard, key, translated, type) => {
        cards.push({'id': cardId, 'content': addCard, 'key': key, 
            'translated': translated, 'translateType': type})
        setCardId(cardId+1)
        console.log(cards)
    }


    const handleFormClear = () => {
        setUserInput({addCard: ''});
        setUserInput({key: ''});
        setUserInput({keyLength: ''});
        setUserInput({translated: ''});
        setLengthError(false)
        setKeyError(false)

    }
    const handleCardClick = (id) => {
        for(var i=0; i<cards.length; i ++){
            if (cards[i]['id'] == id){
                setUserInput({addCard: cards[i].content});
                setUserInput({key: cards[i].key});
                setUserInput({translated: cards[i].translated});
                break;
            }
        }
    }
    const handleCardDelete = (id) =>{
        for(var i=0; i<cards.length; i ++){
            if (cards[i]['id'] == id){
                cards.splice(i, 1);
                setUserInput();
                break;
            }
        }
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
        setIc(icChange/10000)
        console.log(icChange)
    }

    const handleFreqChange = (event) => {
        setFreqTable(event)
        console.log(event)
    }

    const handleSelect = (key, value) => {
        setUserInput({translated: value});
        setUserInput({key: key});
        handleCloseResults();
        setResults([]);

        if (save){
            addToCards(userInput.addCard, key, value, type)
        }
    }

    return (
        <div className="home-wrapper">
            <ErrorModal showModal={showErrorModal} onClose={handleCloseError}/>
            <ResultsModal showModal={showResultsModal} onClose={handleCloseResults} cards={results} onSelect={handleSelect}/>
            <WelcomeModal showModal={showWelcomeModal} onClose={handleCloseWelcome}/>
            <Row className="home">
                <Col md={8} className="inputForm">
                    <InputForm userInput={userInput} setUserInput={setUserInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} 
                    onFormClear={handleFormClear} onToggle={handleToggle} onSwap={handleSwap} onSwitch={handleSwitch} onClearKey={handleClearKey} 
                    onKeyError={keyError} onLengthError={lengthError}/>
                </Col>
        
                <Col md={4} className="tabs" >  
                    <Switch className="save-switch" onSwitch={handleSwitch}/>
  
                    <Tabs className="tabs-header"defaultActiveKey="history" id="uncontrolled-tab-example" onSelect={changeIconColor} >
                         <Tab eventKey="history" title={<span>History<History className="icons" style={{height:16, width:16}} fill={historyColor}/></span>} 
                            style={{ width: "auto", height: window.innerHeight-166, paddingRight:0}} >
                             <PerfectScrollbar>
                                 <Card.Body>
                                 <HistoryCard cards={cards} type={type} onCardClick={handleCardClick} onCardDelete={handleCardDelete}/>
                                 </Card.Body>
                             </PerfectScrollbar>
                         </Tab>
                        <Tab eventKey="advanced" title={<span>Advanced Settings<Setting className="icons" style={{height:16, width:16}} fill={settingColor}/></span>}
                             style={{ width: "auto", height: window.innerHeight-166, paddingRight:0}} >  
                            <Settings onIcChange={handleIcChange} onFreqChange={handleFreqChange} freqTable={freqTable}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <br />
        </div>
    )
}