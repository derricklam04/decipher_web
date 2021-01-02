import React from 'react';
import { Button } from 'react-bootstrap'



export const Clear = ({onFormClear}) => {
    const handleClear = () => {
        onFormClear()
    }

    return (
        <div>
            <Button onClick={handleClear} variant="primary" type="submit" >Clear</Button>
        </div>
    )
}
