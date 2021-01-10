import React from 'react';
import { Card, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'


export const ResultCards = ({cards, onSelect}) => {
    const handleSelect = (key, value) =>{
        onSelect(key,value)
    }
    

    if(cards.length === 0){
        return (
            <div className="loader">
                <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                <br/>
                <p>Loading...</p>
            </div>
        )
    }
    else{
        
        return(
            <div>
            <h6>Select the most probable result:</h6>
            <div id="scrollBar">
                {Object.entries(cards).map(([key,value]) => {
                    return(
                    <>
                        <Card className="historyCard" style={{ width: 'auto', height: '9.3rem'}} >
                            
                            <Card.Body>
                                <Card.Subtitle style={{maxHeight: '1rem', maxWidth:'46rem', overflow:"hidden"}}>{value[0]}</Card.Subtitle>
                                <Card.Text style={{maxHeight: '4.5rem', maxWidth:'46rem', overflow:"hidden"}} >{value[1]}</Card.Text>
                            </Card.Body>
                            <Card.Header style={{ width: 'auto'}}>
                                    <Card.Text>Key Length: {value[0].length}</Card.Text>
                                    <Button className="select" size="sm" variant="outline-info" onClick={() => handleSelect(value[0], value[1])}>Select</Button>
                            </Card.Header>
                        </Card>
                    </>
                    )
                })}
            </div>
            </div>
        )
    }
}
