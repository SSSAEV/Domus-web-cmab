import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MortgageCalc from '../components/Calculator/MortgageCalc';

export default function Mortgage() {
  return (
    <div className="mortgage-page">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title">Ипотечный калькулятор</h1>
          <div className="title-accent" />
          <p className="section-subtitle">
            Рассчитайте ежемесячный платёж и переплату по ипотеке онлайн
          </p>
        </div>

        <MortgageCalc />

        <Row className="g-4 mt-4">
          {[
            { icon: '🏦', title: 'Банки-партнёры', desc: 'Halyk Bank, Kaspi, Forte Bank, BCC, Jysan Bank и ещё 7 банков' },
            { icon: '⚡', title: 'Быстрое одобрение', desc: 'Решение по заявке за 1–3 рабочих дня' },
            { icon: '📝', title: 'Помощь с документами', desc: 'Специалист помогает собрать все документы бесплатно' },
          ].map((item, i) => (
            <Col md={4} key={i}>
              <div className="feature-card" style={{ background: '#fff' }}>
                <div className="feature-icon">{item.icon}</div>
                <h5>{item.title}</h5>
                <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>

        <div className="mt-4 p-3" style={{ background: '#fff8e1', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--secondary)' }}>
          <strong>⚠️ Дисклеймер:</strong> Расчёт является предварительным и носит информационный характер. Точные условия кредитования уточняйте в банке.
        </div>
      </Container>
    </div>
  );
}
