import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export default function AppNavbar() {
  const { favorites } = useFavorites();

  return (
    <Navbar className="domus-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🏛 Domus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={NavLink} to="/" end>Главная</Nav.Link>
            <Nav.Link as={NavLink} to="/catalog">Каталог</Nav.Link>
            <Nav.Link as={NavLink} to="/mortgage">Ипотека</Nav.Link>
            <Nav.Link as={NavLink} to="/contacts">Контакты</Nav.Link>
            <Nav.Link as={NavLink} to="/favorites" className="ms-lg-2">
              ❤️ Избранное
              {favorites.length > 0 && (
                <Badge bg="warning" text="dark" className="ms-1">{favorites.length}</Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
