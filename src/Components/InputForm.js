import React from 'react';
import { Clear } from './Buttons/Clear'
import { Toggle } from './Buttons/Toggle'
import { Form, Button } from 'react-bootstrap'



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
        <Toggle/>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>INPUT</Form.Label>
                <Form.Control as="textarea" rows={3} name="addCard" required value={userInput.addCard} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>KEY</Form.Label>
                <Form.Control type="text" placeholder="key" name="key" required value={userInput.key} onChange={handleChange} />
            </Form.Group>
            <Button variant="success" type="submit" >
                Submit
            </Button>
            <Clear onFormClear={handleClear}/>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>OUTPUT</Form.Label>
                <Form.Control as="textarea" rows={3} name="translated" value={userInput.translated} onChange={handleChange}/>
            </Form.Group>
        </Form>
        </>

        
    )
}