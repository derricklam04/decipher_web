import React, {useState} from 'react';
import { Form, Col, Row, Button} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';


export const Settings = ({onIcChange, onFreqChange, freqTable}) => {
    const [ic, setIc] = useState(615);

    const handleIcChange = () =>{
        onIcChange(ic)
    }

    const handleSelectTable = (event) =>{
        onFreqChange(event.target.value)
    }

    const handleReset = () =>{
        setIc(615)
        onIcChange(615)
        onFreqChange("wiki")
    }

    return(
        <Form className="settings">
            <Form.Label><strong>Index of Coincidence</strong></Form.Label>
            <Form.Text className="sublabel">Recommended Range [0.0600 - 0.0650]</Form.Text>
            <Form.Group as={Row}>
                <Col xs="9">
                    <RangeSlider value={ic} min={550} max={700} onChange={e => setIc(e.target.value)} 
                    tooltipLabel={ic=> `0.${ic}`} onAfterChange={handleIcChange}/>
                </Col>
                <Col xs="3">
                    <Form.Control value={ic / 10000}/>
                </Col>
            </Form.Group>
            <Form.Group >
                <Form.Label><strong>English Letter Frequency Table</strong></Form.Label>
                <Form.Text className="sublabel">Select Table Data from:</Form.Text>
                <Form.Control as="select" htmlSize={2} onChange={handleSelectTable} defaultValue="wiki" value={freqTable}>
                    <option value="wiki">1) Wikipedia</option>
                    <option value="cornell">2) Cornell University</option>
                    <option value="wellesley">3) Wellesley College</option>
                    <option value="practical">4) Practical Cryptography</option>
                </Form.Control>
                <Form.Text style={{"margin-top":10}}>Sources:</Form.Text>
                <ul>
                    <li><Form.Text>https://en.wikipedia.org/wiki/Letter_frequency</Form.Text></li>
                    <li><Form.Text>http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html</Form.Text></li>
                    <li><Form.Text>http://cs.wellesley.edu/~fturbak/codman/letterfreq.html</Form.Text></li>
                    <li><Form.Text>http://practicalcryptography.com/cryptanalysis/letter-frequencies-various-languages/english-letter-frequencies/</Form.Text></li>
                </ul>
            </Form.Group>
            <Button className="reset float-right" variant="danger" onClick={handleReset}>Reset to Defaults</Button>
        </Form>
    )
}