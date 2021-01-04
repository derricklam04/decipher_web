import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'


export const HistoryCard = ({cards, onCardClick, onCardDelete}) => {

    const handleClick = (card) =>{
        onCardClick(card)
    }
    const handleDelete = (event, id) =>{
        event.stopPropagation()
        onCardDelete(id)
    }


    return(
        <div id="scrollBar">
            {cards.slice(0).reverse().map(card => {
                return(
                <>
                    <Card className="historyCard" style={{ width: 'auto', height: '8rem'}} key={card.id} >
                        
                        <Card.Body>
                            <Card.Subtitle>{card.key}</Card.Subtitle>
                            <Card.Text >{card.content}</Card.Text>

                        </Card.Body>
                        <Card.Header style={{ width: 'auto'}}>
                                
                                <Button size="sm" variant="danger" onClick={(event) => handleDelete(event, card.id)}>Delete</Button>

                                <Button size="sm" variant="outline-info" onClick={() => handleClick(card)}>Show</Button>

                        </Card.Header>
                    </Card>
                  </>
                )
            })}
        </div>
    )
}