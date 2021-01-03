import React from 'react';
import { Button } from 'react-bootstrap'



export const Clear = ({onFormClear, disabled}) => {


    const handleClear = () => {
        onFormClear()
    }

    return (
        <div>
            <Button onClick={handleClear} variant="primary" type="submit" disabled={disabled}>Clear</Button>
        </div>
    )
}
