import React from 'react';
import { Form } from 'react-bootstrap'



export const Switch = ({onSwitch}) => {

    const handleSwitch = () => {
        onSwitch()
    }
    return (
        <Form.Check 
            className="switch"
            onClick={handleSwitch}
            type="switch"
            id="custom-switch"
            label="Save to History"
            defaultChecked
        />
    )
}
