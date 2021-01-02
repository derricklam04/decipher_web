import React from 'react';

export const Card = ({cards, onCardClick, onCardDelete}) => {

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
                    <div key={card.id}>
                        <ul >
                            <li onClick={() => handleClick(card)}>Text: {card.content}
                                <button onClick={(event) => handleDelete(event, card.id)}>X</button>
                            </li>
                            <p>key: {card.key}</p>
                        </ul>
                        
                    </div>
                )
            })}
        </div>
    )
}