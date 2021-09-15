import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default (props) => {
  return (
    <div>
      <Card className="mb-3" style={{ width: '12rem', flex: 1 }}>
        <Card.Img
          variant="top"
          src={props.data.poster_path ? props.data.poster_path : require('../assets/images/placeholder.png')}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: '100%' }}>{props.data.title}</Card.Title>
          <Card.Text style={{ fontSize: '75%' }}>Popularity : {props.data.popularity}/10</Card.Text>
          {props.data.__typename === 'Movie' ? (
            <Button as={Link} to={`movies/${props.data._id}`} variant="primary" block>
              Details
            </Button>
          ) : (
            <Button as={Link} to={`tv/${props.data._id}`} variant="primary" block>
              Details
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
