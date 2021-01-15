import React, {useState} from 'react';
import { Form } from 'react-bootstrap'
import _Switch from "react-switch";


export const Switch = ({onSwitch}) => {
    const [checked, setChecked] = useState(true)

    const handleSwitch = () => {
        setChecked(!checked)
        onSwitch()
    }
    return (
        <label className="switch">
            <span>Save</span>
            <_Switch className="bar" onColor={"#4287f5"} onChange={handleSwitch} checked={checked} height={17} width={40}/>
        </label>
    )
}
