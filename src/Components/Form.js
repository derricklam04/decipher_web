import React from 'react';
import { Clear } from './Buttons/Clear'


export const Form = ( {userInput, translatedText, onFormChange, onFormSubmit, onFormClear} ) => {

    const handleChange = (event) => {
        onFormChange(event.target.name, event.target.value)
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
            <input name="input" type='text' required value={userInput} onChange={handleChange}></input>
            <input type='submit'></input>            
        </form>
        <Clear onFormClear={handleClear}/>
        <form>
            <input name="output" type='text' value={translatedText} onChange={handleChange} ></input>
        </form>
        
        </>
    )
}