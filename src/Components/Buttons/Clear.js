import React from 'react';


export const Clear = ({onFormClear}) => {
    const handleClear = () => {
        onFormClear()
    }

    return (
        <div>
            <button onClick={handleClear}>clear</button>
        </div>
    )
}
