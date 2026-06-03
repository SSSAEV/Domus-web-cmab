import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '../components/ContactForm/ContactForm';
import OfficesMap from '../components/MapView/OfficesMap';
import QRSection from '../components/QRCode/QRSection';

export default function Contacts() {
  return (
    <div className="contacts-page">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title">Контакты</h1>
          <div className="title-accent" />
          <p className="section-subtitle">Оставьте заявку и мы подберём для вас идеальный вариант</p>
        </div>

        <Row className="g-4 mb-5">
          <Col lg={7}>
            <ContactForm />
          </Col>
          <Col lg={5}>
            <Row className="g-3">
              {[
                { icon: '📍', title: 'Главный офис', desc: 'г. Алматы, ул. Абая, 52' },
                { icon: '📞', title: 'Телефон', desc: '+7 (727) 222-33-44' },
                { icon: '✉️', title: 'Email', desc: 'info@domus.kz' },
                { icon: '🕐', title: 'Режим работы', desc: 'Пн–Пт: 9:00–19:00, Сб: 10:00–16:00' },
              ].map((c, i) => (
                <Col xs={6} key={i}>
                  <div style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--card-shadow)', padding: '1.25rem', height: '100%' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                    <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{c.title}</div>
                    <div style={{ color: '#6c757d', fontSize: '0.85rem' }}>{c.desc}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col lg={8}>
            <h4 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              Наши офисы на карте
            </h4>
            <div className="map-card">
              <OfficesMap />
            </div>
          </Col>
          <Col lg={4}>
            <h4 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
              QR-код сайта
            </h4>
            <QRSection url="https://domus.vercel.app" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
