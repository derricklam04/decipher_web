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
        <div>
            {cards.map(card => {
                return(
                <>
                    <Card style={{ width: '18rem', height: '8rem'}} key={card.id} onClick={() => handleClick(card)}>
                        <Card.Header>
                                Encrypt
                                <Button size="sm" variant="outline-danger" onClick={(event) => handleDelete(event, card.id)}>X</Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Subtitle>{card.key}</Card.Subtitle>
                            <Card.Text >{card.content}</Card.Text>

                        </Card.Body>
                    </Card>
                  </>
                )
            })}
        </div>
    )
}