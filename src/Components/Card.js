import React from 'react';

export const Card = ({cards, onCardClick, onCardDelete}) => {

    const handleClick = (card) =>{
        onCardClick(card)
    }
    const handleDelete = (id) =>{
        onCardDelete(id)
    }


    return(
        <div>
            {cards.map(card => {
                return(
                    <div key={card.id}>
                        <ul >
                            <li onClick={() => handleClick(card)}>{card.content}</li>
                        </ul>
                        <button onClick={() => handleDelete(card.id)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}