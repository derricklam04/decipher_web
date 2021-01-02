import React from 'react';
import { Clear } from './Buttons/Clear'


export const Form = ( {userInput, onFormChange, onFormSubmit, onFormClear} ) => {

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
        <form onSubmit={handleSubmit}>
            <label> Input:
                <input name="addCard" type='text' required value={userInput.addCard} onChange={handleChange}></input>
            </label>
            <label> key:
                <input name="key" type='text' required value={userInput.key} onChange={handleChange}></input>
            </label>
            <input type='submit'></input>            
        </form>
        <Clear onFormClear={handleClear}/>
        <form>
            <label> Output:
            <input name="translated" type='text' value={userInput.translated} onChange={handleChange} ></input>
            </label>
        </form>
        
        </>
    )
}