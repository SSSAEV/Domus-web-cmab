import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useFavorites } from '../../context/FavoritesContext';

const CURRENCIES = {
  KZT: { label: '₸', rate: 1 },
  USD: { label: '$', rate: 0.00222 },
  RUB: { label: '₽', rate: 0.2 },
};

export default function PropertyCard({ property, currency = 'KZT' }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(property.id);
  const curr = CURRENCIES[currency] || CURRENCIES.KZT;
  const price = Math.round(property.price * curr.rate);
  const priceStr = price.toLocaleString('ru-RU') + ' ' + curr.label;

  const sliderSettings = {
    dots: false, arrows: false, infinite: true,
    speed: 400, slidesToShow: 1, slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <Card className="property-card h-100" style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        {property.images.length > 1 ? (
          <Slider {...sliderSettings}>
            {property.images.map((img, i) => (
              <div key={i}>
                <img src={img} alt={property.title} className="card-img-top" style={{ height: 200, objectFit: 'cover', width: '100%' }} />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={property.images[0]} alt={property.title} className="card-img-top" />
        )}
        <button
          className={`fav-btn ${fav ? 'active' : ''}`}
          onClick={() => toggleFavorite(property.id)}
          title={fav ? 'Убрать из избранного' : 'В избранное'}
        >
          {fav ? '❤️' : '🤍'}
        </button>
        {property.priceDrop && (
          <Badge bg="danger" className="position-absolute" style={{ top: 12, left: 12, fontSize: '0.7rem' }}>
            📉 Снижена цена
          </Badge>
        )}
        {property.isNew && (
          <Badge bg="success" className="position-absolute" style={{ top: property.priceDrop ? 36 : 12, left: 12, fontSize: '0.7rem' }}>
            🆕 Новостройка
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="property-price mb-1">{priceStr}</div>
        <div className="property-address">📍 {property.address}</div>
        <div className="property-meta mb-2">
          <span>📐 {property.area} м²</span>
          {property.floor > 0 && <span>🏢 {property.floor}/{property.totalFloors} эт.</span>}
          <span>{property.rooms === 0 ? 'Студия' : property.rooms + '-комн.'}</span>
        </div>
        <Badge bg="secondary" className="mb-2 align-self-start">{property.type}</Badge>
        <div className="mt-auto pt-2">
          <Button as={Link} to={`/catalog/${property.id}`} size="sm" className="btn-primary-domus w-100">
            Подробнее
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
