import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'


export const ResultCards = ({cards, onSelect}) => {
    const handleSelect = (key, value) =>{
        onSelect(key,value)
    }
    return(
        <div id="scrollBar">
            {Object.entries(cards).map(([key,value]) => {

                return(
                <>
                    <Card className="historyCard" style={{ width: 'auto', height: '9.3rem'}} >
                        
                        <Card.Body>
                            <Card.Subtitle style={{maxHeight: '1rem', maxWidth:'46rem', overflow:"hidden"}}>{key}</Card.Subtitle>
                            <Card.Text style={{maxHeight: '4.5rem', maxWidth:'46rem', overflow:"hidden"}} >{value}</Card.Text>
                        </Card.Body>
                        <Card.Header style={{ width: 'auto'}}>
                                <Card.Text>Key Length: {key.length}</Card.Text>

                                <Button className="select" size="sm" variant="outline-info" onClick={() => handleSelect(key,value)}>Select</Button>
                        </Card.Header>
                    </Card>
                </>
                )
            })}
        </div>
    )
}
