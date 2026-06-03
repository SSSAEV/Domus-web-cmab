import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="domus-footer">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>🏛 Domus</h5>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Платформа для поиска и покупки недвижимости в Алматы и по всему Казахстану. Прозрачно. Надежно. Профессионально.
            </p>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>Разделы</h5>
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/mortgage">Ипотека</Link>
            <Link to="/contacts">Контакты</Link>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5>Типы объектов</h5>
            <Link to="/catalog?type=Квартира">Квартиры</Link>
            <Link to="/catalog?type=Дом">Дома</Link>
            <Link to="/catalog?type=Участок">Участки</Link>
            <Link to="/catalog?isNew=true">Новостройки</Link>
          </Col>
          <Col md={3}>
            <h5>Контакты</h5>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginBottom: '0.3rem' }}>📍 г. Алматы, ул. Абая, 52</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginBottom: '0.3rem' }}>📞 +7 (727) 222-33-44</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>✉️ info@domus.kz</p>
          </Col>
        </Row>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Domus — Платформа недвижимости. Учебный проект.
        </div>
      </Container>
    </footer>
  );
}
