import React from 'react';
import { ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

export const Toggle = () => {
    return (
        <div>
            <ToggleButtonGroup type="radio" name="type" defaultValue='encrypt'>
                <ToggleButton value='encrypt'>Encrypt</ToggleButton>
                <ToggleButton value='decrypt'>Decrypt</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
