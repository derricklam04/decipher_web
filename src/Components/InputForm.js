import React, {useState} from 'react';
import { Clear } from './Buttons/Clear'
import { Card, Nav, Form, Button, ButtonGroup, Col } from 'react-bootstrap'



export const InputForm = ( {userInput, onFormChange, onFormSubmit, onFormClear, onToggle} ) => {

    const [disableKeyLength, setDisableKeyLength] = useState(true)
    const [requireKey, setRequireKey] = useState(true)
    const [placeHolder, setPlaceHolder] = useState("Input Here...")


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
            setPlaceHolder("Input Here...")
        }else if(event === "#decrypt"){
            setDisableKeyLength(false)
            setRequireKey(false)
            setPlaceHolder("Input Here...\n\n( leave Key or Key Length empty if unknown )")
        }
    }
    
    return(
        <>        
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#encrypt" onSelect={handleToggle}>
                <Nav.Item>
                    <Nav.Link href="#encrypt" >Encrypt</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#decrypt" >Decrypt</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control as="textarea" placeholder ={placeHolder} rows={8} name="addCard" required value={userInput.addCard} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Row>
                        <Col md={5}>
                            <Form.Control type="text" placeholder="Enter Key" name="key" required={requireKey} value={userInput.key} 
                                onChange={handleChange} />
                        </Col>
                        <Col md={2}>
                            <Form.Control type="number" placeholder="Key Length" name="keyLength" 
                                value={userInput.keyLength} onChange={handleChange} disabled={disableKeyLength}/>
                        </Col>
                        <Col md={{offset:2}}>
                            <Clear onFormClear={handleClear} 
                                disabled={userInput.addCard === "" && userInput.key === "" && userInput.translated === ""}/>
                        </Col>
                        <Col md="auto">
                            <Button variant="success" type="submit" >Submit </Button>
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