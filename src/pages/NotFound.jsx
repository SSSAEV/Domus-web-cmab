import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="not-found">
        <h1>404</h1>
        <h3 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif' }}>Страница не найдена</h3>
        <p className="text-muted mb-4">Кажется, такой страницы не существует. Возможно, она была удалена или вы перешли по неверной ссылке.</p>
        <div className="d-flex gap-3">
          <Button className="btn-primary-domus" onClick={() => navigate('/')}>На главную</Button>
          <Button variant="outline-secondary" onClick={() => navigate('/catalog')}>Каталог</Button>
        </div>
      </div>
    </Container>
  );
}
