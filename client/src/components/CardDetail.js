import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
  const params = useParams();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Image
        src={props.data.poster_path}
        style={{ height: '400px', objectFit: 'cover', marginRight: '10px' }}
        rounded
      />
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted" style={{ fontStyle: 'italic' }}>
            Tags : {props.data.tags.join(', ')}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{props.data.popularity}/10</Card.Subtitle>
          <Card.Text>{props.data.overview}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {props.favorites.favorites.includes(params.id) ? (
            <FontAwesomeIcon icon={faHeart} color="red" onClick={props.favoritesAction} />
          ) : (
            <FontAwesomeIcon icon={faHeart} onClick={props.favoritesAction} />
          )}
          <Link to={`${location.pathname}/edit`}>
            <FontAwesomeIcon className="ml-3" icon={faPen} color="#008080" />
          </Link>
          <FontAwesomeIcon onClick={props.deleteAction} className="ml-3" icon={faTrash} color="#C80000" />
        </Card.Footer>
      </Card>
    </div>
  );
};
