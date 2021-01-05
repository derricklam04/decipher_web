import React from 'react';
import { Button } from 'react-bootstrap'
import icon from "../../Icons/swap.png"

export const Swap = ({onSwap, disabled}) => {


    const handleSwap = () => {
        onSwap()
    }

    return (
        <div>
            <Button className="swap" onClick={handleSwap} variant="primary" disabled={disabled}>
                <img className="img" height="24" src={icon}/>
            </Button>
        </div>
    )
}