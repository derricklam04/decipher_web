import React from 'react';

export const Card = ({cards, onCardClick}) => {

    const handleClick = (content) =>{
        onCardClick(content)
    }

    return(
        <div>
            {cards.map(card => {
                return(
                    <ul key={card.id}>
                        <li onClick={() => handleClick(card.content)}>{card.content}</li>
                    </ul>
                )
            })}
        </div>
    )
}