import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { useFavorites } from '../context/FavoritesContext';
import { properties } from '../data/properties';

export default function Favorites() {
  const { favorites } = useFavorites();
  const favProps = properties.filter(p => favorites.includes(p.id));

  return (
    <Container className="py-5">
      <h1 className="section-title mb-1">Избранное</h1>
      <div className="title-accent ms-0" style={{ margin: '0.5rem 0 2rem' }} />

      {favProps.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '5rem' }}>🤍</div>
          <h3 style={{ color: 'var(--primary)' }}>Нет избранных объектов</h3>
          <p className="text-muted">Нажмите на сердечко на карточке объекта, чтобы добавить его сюда</p>
          <Button className="btn-primary-domus mt-2" as={Link} to="/catalog">Перейти в каталог</Button>
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">Сохранено объектов: <strong>{favProps.length}</strong></p>
          <Row className="g-4">
            {favProps.map(p => (
              <Col sm={6} lg={4} key={p.id}>
                <PropertyCard property={p} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
