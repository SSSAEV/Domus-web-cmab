import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { properties } from '../data/properties';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === Number(id));
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currency, setCurrency] = useState('KZT');

  if (!property) {
    return (
      <Container className="py-5 text-center">
        <h2>Объект не найден</h2>
        <Button className="btn-primary-domus mt-3" onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
      </Container>
    );
  }

  const fav = isFavorite(property.id);
  const currencies = { KZT: { label: '₸', rate: 1 }, USD: { label: '$', rate: 0.00222 }, RUB: { label: '₽', rate: 0.2 } };
  const curr = currencies[currency];
  const price = Math.round(property.price * curr.rate);
  const priceStr = price.toLocaleString('ru-RU') + ' ' + curr.label;

  const settings = { dots: true, arrows: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  const similar = properties.filter(p => p.type === property.type && p.id !== property.id).slice(0, 3);

  return (
    <Container className="py-4">
      <nav style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
        <Link to="/" style={{ color: '#888' }}>Главная</Link> /{' '}
        <Link to="/catalog" style={{ color: '#888' }}>Каталог</Link> /{' '}
        <span style={{ color: 'var(--primary)' }}>{property.title}</span>
      </nav>

      <Row className="g-4">
        <Col lg={8}>
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <Slider {...settings}>
              {property.images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt={property.title} style={{ width: '100%', height: 420, objectFit: 'cover' }} />
                </div>
              ))}
            </Slider>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            {property.title}
          </h1>
          <p style={{ color: '#888', marginBottom: '1rem' }}>📍 {property.address}, {property.district} р-н</p>

          <div className="d-flex gap-2 flex-wrap mb-3">
            <Badge bg="secondary">{property.type}</Badge>
            {property.isNew && <Badge bg="success">Новостройка</Badge>}
            {property.priceDrop && <Badge bg="danger">📉 Снижена цена</Badge>}
          </div>

          <div style={{ background: 'var(--light-bg)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h5 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Характеристики</h5>
            <Row className="g-2">
              {[
                ['Площадь', property.area + ' м²'],
                ['Комнаты', property.rooms === 0 ? 'Студия' : property.rooms],
                ['Этаж', property.floor > 0 ? `${property.floor} / ${property.totalFloors}` : '-'],
                ['Район', property.district],
                ['Срок сдачи', property.delivery],
                ['Тип', property.type],
              ].map(([k, v]) => (
                <Col xs={6} sm={4} key={k}>
                  <div style={{ background: '#fff', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>{k}</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{v}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <h5 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>Описание</h5>
          <p style={{ color: '#555', lineHeight: 1.8 }}>{property.description}</p>
        </Col>

        <Col lg={4}>
          <div style={{ position: 'sticky', top: 90, background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--card-shadow)', padding: '1.5rem' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#999' }}>Стоимость</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
              {priceStr}
            </div>

            <div className="d-flex gap-1 mb-3">
              {Object.entries(currencies).map(([k]) => (
                <button
                  key={k}
                  className={`btn btn-sm ${currency === k ? 'btn-dark' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrency(k)}
                >{k}</button>
              ))}
            </div>

            <Button className="btn-gold w-100 mb-2 py-2">📞 Позвонить агенту</Button>
            <Button className="btn-primary-domus w-100 mb-2 py-2" as={Link} to="/contacts">✉️ Оставить заявку</Button>
            <Button
              variant="outline-secondary"
              className="w-100 py-2"
              onClick={() => toggleFavorite(property.id)}
            >
              {fav ? '❤️ В избранном' : '🤍 В избранное'}
            </Button>

            <hr />
            <div style={{ fontSize: '0.85rem', color: '#888' }}>
              <div className="mb-1">📐 {property.area} м² · {(property.price / property.area / 1000).toFixed(0)} тыс. ₸/м²</div>
              <div className="mb-1">💳 Ежемесячно от <strong style={{ color: 'var(--primary)' }}>{Math.round(property.price * 0.8 * 0.0116).toLocaleString('ru-RU')} ₸</strong></div>
              <div style={{ fontSize: '0.75rem', color: '#bbb' }}>Расчет при 20% взносе, 20 лет, 14%</div>
            </div>
          </div>
        </Col>
      </Row>

      {similar.length > 0 && (
        <div className="mt-5">
          <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)', marginBottom: '1.5rem' }}>Похожие объекты</h3>
          <Row className="g-4">
            {similar.map(p => (
              <Col sm={6} lg={4} key={p.id}>
                <div className="property-card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/catalog/${p.id}`)}>
                  <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div className="property-price">{(p.price / 1000000).toFixed(1)} млн ₸</div>
                    <div className="property-address">{p.address}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}
