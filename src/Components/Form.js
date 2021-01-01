import React from 'react';

export const Form = ( {userInput, codedText, onFormChange, onFormSubmit} ) => {

    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type='text' required value={userInput} onChange={handleChange}></input>
            <input type='submit'></input>            
        </form>
        <form>
            <input type='text' defaultValue={codedText}></input>
        </form>
        </>
    )
}