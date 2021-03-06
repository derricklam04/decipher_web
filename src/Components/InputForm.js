import React, {useState} from 'react';
import { Clear } from './Buttons/Clear'
import { Swap } from './Buttons/Swap'
import { Switch } from './Buttons/Switch'

import { Card, Nav, Form, Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'



export const InputForm = ( {userInput, onFormChange, onFormSubmit, onFormClear, onToggle, onSwap, onSwitch, onClearKey, onKeyError, onLengthError} ) => {

    const [disableKeyLength, setDisableKeyLength] = useState(false)
    const [requireKey, setRequireKey] = useState(false)
    const [placeholder, setPlaceholder] = useState("Input Here... \n\nLeave 'Key' or 'Key Length' empty if unknown")

    const handleChange = (event) => {
        onFormChange(event)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    const handleClear = () => {
        onFormClear()
    }

    const handleToggle = (event) => {
        onToggle(event)
        if(event === "#encrypt"){
            setDisableKeyLength(true)
            setRequireKey(true)
            onClearKey()
            setPlaceholder("Input Here...")

        }else if(event === "#decrypt"){
            setDisableKeyLength(false)
            setRequireKey(false)
            setPlaceholder("Input Here... \n\nLeave 'Key' or 'Key Length' empty if unknown")
        }
    }

    const handleSwap = () => {
        onSwap()
    }

    const handleSwitch = () => {
        onSwitch()
    }
    
    return(
        <>        
        <Card style={{height: window.innerHeight-110}}>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#decrypt" onSelect={handleToggle}>
                <Nav.Item>
                    <Nav.Link href="#decrypt" >Decrypt</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#encrypt" >Encrypt</Nav.Link>
                </Nav.Item>
                
                <Switch onSwitch={handleSwitch}/>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group>
                        <Form.Control as="textarea" placeholder={placeholder} rows={8} name="addCard" required 
                            value={userInput.addCard} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Row>
                        <Col md={5}>
                        <OverlayTrigger key='bottom' placement='bottom' 
                            overlay={<Tooltip >Enter <strong>English Letters</strong> Only</Tooltip>}>
                            <Form.Control type="search" placeholder="Enter Key" name="key" 
                            value={userInput.key} isInvalid={onKeyError} onChange={handleChange} />
                        </OverlayTrigger>
                        </Col>

                        <Col md={2}>
                        <OverlayTrigger key='bottom' placement='bottom' 
                            overlay={<Tooltip>Enter <strong>Numbers</strong> only</Tooltip>}>
                            <Form.Control type="search" placeholder="Key Length" name="keyLength" isInvalid={onLengthError} 
                                value={userInput.keyLength} onChange={handleChange} disabled={disableKeyLength}/>
                        </OverlayTrigger>
                        </Col>
                        <Col md={{offset:1, span:0}} >
                            <Swap onSwap={handleSwap} disabled={userInput.addCard === "" && userInput.translated === ""}/>
                        </Col>
                        <Col md="auto" className="clearBtn">
                            <Clear onFormClear={handleClear} 
                                disabled={userInput.addCard === "" && userInput.key === "" && userInput.keyLength ==="" && userInput.translated === ""}/>
                        </Col>
                        <Col md="auto">
                            <Button variant="success" type="submit" 
                            disabled={(requireKey===true && userInput.key === "") || userInput.addCard === ""}> 
                            Submit </Button>
                        </Col>
                    </Form.Row>
                    </Form.Group>

                    
                    <Form.Group>
                        <Form.Control as="textarea" rows={8} placeholder ="Output Here..." name="translated" value={userInput.translated} onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </>

        
    )
}