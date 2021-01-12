import React from 'react';
import { Card, Button} from 'react-bootstrap'


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
                                <Card.Subtitle style={{maxHeight: '1rem', width:'25rem', overflow:"hidden"}}>{card.key}</Card.Subtitle>
                                <Card.Text style={{maxHeight: '4.5rem', maxWidth:'25rem', overflow:"hidden"}} >{card.content}</Card.Text>
                            </Card.Body>
                            <Card.Header style={{ width: 'auto'}}>
                                    <Card.Text>{card.translateType}ed</Card.Text>
                                    <Button size="sm" variant="danger" onClick={(event) => handleDelete(event, card.id)}>Remove</Button>
                                    <Button size="sm" variant="outline-info" onClick={() => handleClick(card.id)}>View</Button>

                            </Card.Header>
                        </Card>
                    </>
                    )
                })}
            </div>
        )
    }
}