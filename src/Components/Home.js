import React, {useState, useEffect, useReducer} from 'react';
import { HistoryCard } from './HistoryCard'
import { InputForm } from './InputForm'
import {Settings} from './Settings'
import { ErrorModal } from './Modal/ErrorModal'
import { ResultsModal } from './Modal/ResultsModal'

import { Row, Col, Card, Tab, Tabs} from 'react-bootstrap'

export const Home = () => {
    const [showErrorModal, setErrorModal] = useState(false);
    const handleCloseError = () => setErrorModal(false);
    const handleShowError = () => {
        setErrorModal(true);
        setResultsModal(false);
    }

    const [showResultsModal, setResultsModal] = useState(false);
    const handleCloseResults = () => {
        setResultsModal(false);
        setResults([])
    }
    const handleShowResults = () => setResultsModal(true);
    const [results, setResults] = useState([]);

    const [type, setType] = useState('#decrypt')

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
            console.log("before fetchv3");
            fetch('api/create', {
                method: 'POST',
                body: JSON.stringify({
                    content: userInput.addCard,
                    key: userInput.key,
                    keyLength: userInput.keyLength,
                    type: type,

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
                        console.log(message['results'])
                        setResults(message['results'])
                    }else{
                        setResultsModal(false);
                        setUserInput({translated: message['translatedText'] });
                        setUserInput({key: message['key'] });
                    }
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

    const handleToggle = (event) => {
        setType(event)
    }

    const handleSwap = () =>{
        var temp = userInput.addCard;
        setUserInput({addCard: userInput.translated});
        setUserInput({translated: temp});
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
    }

    return (
        <div className="home-wrapper">
            <ErrorModal showModal={showErrorModal} onClose={handleCloseError}/>
            <ResultsModal showModal={showResultsModal} onClose={handleCloseResults} cards={results} onSelect={handleSelect}/>
            <Row className="home">
                <Col md={8} className="inputForm">
                    <InputForm userInput={userInput} setUserInput={setUserInput} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} 
                    onFormClear={handleFormClear} onToggle={handleToggle} onSwap={handleSwap} onClearKey={handleClearKey} 
                    onKeyError={keyError} onLengthError={lengthError}/>
                </Col>

                <Col className="tabs" >      
                    <Tabs className="tabs-header"defaultActiveKey="advanced" id="uncontrolled-tab-example"  >
                        <Tab eventKey="advanced" title="Settings" style={{ width: "auto", height: window.innerHeight-166, paddingRight:0}}>
                            <Settings onIcChange={handleIcChange} onFreqChange={handleFreqChange} freqTable={freqTable}/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <br />
        </div>
    )
}