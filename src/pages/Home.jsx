import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { hotDeals } from '../data/properties';

const HERO_SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80',
    title: 'Найдите дом вашей мечты',
    subtitle: 'Более 1500 объектов в Алматы и Казахстане',
  },
  {
    bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
    title: 'Элитная недвижимость',
    subtitle: 'Пентхаусы, таунхаусы и виллы от топ-застройщиков',
  },
  {
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
    title: 'Ипотека от 14%',
    subtitle: 'Помогаем получить одобрение в 12 банках',
  },
];

const FEATURES = [
  { icon: '⚖️', title: 'Юридическая чистота', desc: 'Полная проверка документов и юридическое сопровождение сделки' },
  { icon: '🖥️', title: 'Онлайн-показ', desc: 'Виртуальные туры и видеозвонки с риелтором в удобное время' },
  { icon: '🏗️', title: 'Топ застройщики', desc: 'Сотрудничаем только с проверенными и аккредитованными застройщиками' },
  { icon: '💳', title: 'Помощь в ипотеке', desc: 'Оформим ипотеку за 3 дня, работаем с 12 банками-партнёрами' },
];

function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(target * progress));
      if (progress === 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, start]);
  return value;
}

function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const obj = useCountUp(1500, 1800, started);
  const yrs = useCountUp(12, 1500, started);
  const cli = useCountUp(98, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <Container>
        <Row className="text-center g-4">
          {[
            { num: obj + '+', label: 'Объектов в базе' },
            { num: yrs, label: 'Лет на рынке' },
            { num: cli + '%', label: 'Довольных клиентов' },
          ].map((s, i) => (
            <Col md={4} key={i}>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('Алматы');
  const [type, setType] = useState('');

  const sliderSettings = {
    dots: true, arrows: false, infinite: true,
    speed: 800, slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 4000, fade: true,
  };

  const hotSettings = {
    dots: true, infinite: true, speed: 500,
    slidesToShow: 3, slidesToScroll: 1, autoplay: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    navigate('/catalog?' + params.toString());
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <Slider {...sliderSettings}>
          {HERO_SLIDES.map((slide, i) => (
            <div key={i}>
              <div className="hero-slide" style={{ backgroundImage: `url(${slide.bg})` }} />
            </div>
          ))}
        </Slider>
        <div className="hero-content">
          <h1 className="hero-title">{HERO_SLIDES[0].title}</h1>
          <p className="hero-subtitle">{HERO_SLIDES[0].subtitle}</p>
          <div className="hero-search-bar">
            <input
              type="text"
              placeholder="Город или район..."
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Все типы</option>
              <option value="Квартира">Квартира</option>
              <option value="Дом">Дом</option>
              <option value="Участок">Участок</option>
            </select>
            <button className="btn hero-search-btn" onClick={handleSearch}>Найти</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Почему выбирают Domus?</h2>
            <div className="title-accent" />
            <p className="section-subtitle">Мы делаем покупку недвижимости простой и безопасной</p>
          </div>
          <Row className="g-4">
            {FEATURES.map((f, i) => (
              <Col sm={6} lg={3} key={i}>
                <div className="feature-card animate-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="feature-icon">{f.icon}</div>
                  <h5>{f.title}</h5>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Hot Deals */}
      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Горячие предложения</h2>
            <div className="title-accent" />
            <p className="section-subtitle">Лучшие объекты со скидками и специальными условиями</p>
          </div>
          <Slider {...hotSettings}>
            {hotDeals.map(p => (
              <div key={p.id} className="px-2">
                <PropertyCard property={p} />
              </div>
            ))}
          </Slider>
          <div className="text-center mt-5">
            <Button className="btn-primary-domus px-5 py-2" onClick={() => navigate('/catalog')}>
              Смотреть весь каталог →
            </Button>
          </div>
        </Container>
      </section>

      <StatsSection />

      {/* CTA */}
      <section style={{ padding: '60px 0', background: 'var(--light-bg)' }}>
        <Container>
          <Row className="align-items-center g-4">
            <Col md={8}>
              <h2 className="section-title mb-2">Готовы найти свой дом?</h2>
              <p style={{ color: '#6c757d', fontSize: '1.05rem' }}>
                Оставьте заявку и наш эксперт подберёт для вас лучшие варианты бесплатно.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button className="btn-gold px-5 py-3 me-2" onClick={() => navigate('/contacts')}>
                Оставить заявку
              </Button>
              <Button variant="outline-secondary" className="px-4 py-3" onClick={() => navigate('/mortgage')}>
                Рассчитать ипотеку
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
