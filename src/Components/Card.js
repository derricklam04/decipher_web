import React from 'react';

export const Card = ({cards}) => {
    return(
        <div>
            {cards.map(card => {
                return(
                    <ul key={card.id}>
                        <li>{card.content}</li>
                    </ul>
                )
            })}
        </div>
    )
}