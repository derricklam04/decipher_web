import React from 'react';
import { Clear } from './Buttons/Clear'
import { Toggle } from './Buttons/Toggle'
import { Card, Nav, Form, Button, ButtonGroup, Col } from 'react-bootstrap'



export const InputForm = ( {userInput, onFormChange, onFormSubmit, onFormClear} ) => {

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
    
    return(
        <>        
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link href="#first">Encrypt</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#link">Decrypt</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control as="textarea" placeholder ="Input Here..." rows={8} name="addCard" required value={userInput.addCard} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Row>
                        <Col xs='auto'>
                            <Form.Control type="text" placeholder="Enter Key" name="key" required value={userInput.key} onChange={handleChange} />
                        </Col>
                        <Col xs='auto'>
                            <Clear onFormClear={handleClear}/>
                        </Col>
                        <Col xs='auto'>
                            <Button variant="success" type="submit">Submit </Button>
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