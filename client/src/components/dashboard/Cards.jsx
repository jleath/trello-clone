import React from 'react';
import { useSelector } from 'react-redux';
import SingleCard from './SingleCard';

const Cards = ({ listId }) => {
  const cards = useSelector(state => state.cards.filter(card => listId === card.listId));

  return (
    <div id="cards-container" data-id="list-1-cards">
      {cards.map(card => <SingleCard key={card._id} card={card} />)}
    </div>
  );
};

export default Cards;