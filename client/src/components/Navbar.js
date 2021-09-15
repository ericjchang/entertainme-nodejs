import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export default () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        EntertainMe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/movies">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/tv">
            TV Series
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            Favorites
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
