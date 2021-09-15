import React from 'react';
import { CardDeck } from 'react-bootstrap';

import Card from '../components/Card';

export default (props) => {
  return (
    <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
      {props.data.map((el, idx) => (
        <Card key={idx} data={el} />
      ))}
    </CardDeck>
  );
};
