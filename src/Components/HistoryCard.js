import React from 'react';
import { Card, Button, Row, Col} from 'react-bootstrap'
import arrow from '../Icons/right-arrow.png'



export const HistoryCard = ({cards, onCardClick, onCardDelete}) => {

    const handleClick = (id) =>{
        onCardClick(id)
    }
    const handleDelete = (event, id) =>{
        event.stopPropagation()
        onCardDelete(id)
    }

    if(cards.length === 0){
        return (
            <p className="empty">No History to Display</p>
        )
    }
    else{

        return(
            <div id="scrollBar">
                {cards.slice(0).reverse().map((card) => {
                    return(
                    <>
                        <Card className="historyCard" style={{ width: 'auto', height: '9.3rem'}} key={card.id} >
                            
                            <Card.Body>
                                <Card.Subtitle style={{maxHeight: '1rem', maxWidth:'25rem', overflow:"hidden"}}>{card.key}</Card.Subtitle>
                                <Row>
                                    <Col>
                                    <Card.Text style={{ maxHeight: '4.5rem', overflow:"hidden"}} >{card.content}</Card.Text>
                                    </Col>
                                    <img className="arrow" height={15} src={arrow}/>
                                    <Col>
                                    <Card.Text style={{maxHeight: '4.5rem',  overflow:"hidden"}} >{card.translated}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Header style={{ width: 'auto'}}>
                                    <Card.Text style={{color:"#525252"}}>{card.translateType}ed</Card.Text>
                                    <Button size="sm" variant="outline-danger" style={{border:"none"}} onClick={(event) => handleDelete(event, card.id)}>Remove</Button>
                                    <Button size="sm" variant="outline-info" style={{border:"none"}} onClick={() => handleClick(card.id)}>View</Button>

                            </Card.Header>
                        </Card>
                    </>
                    )
                })}
            </div>
        )
    }
}