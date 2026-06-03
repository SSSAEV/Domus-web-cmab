import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Offcanvas, Badge } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import PropertiesMap from '../components/MapView/PropertiesMap';
import { properties } from '../data/properties';

const CURRENCIES = ['KZT', 'USD', 'RUB'];
const VIEWS = [
  { key: 'grid', icon: '⊞', label: 'Сетка' },
  { key: 'list', icon: '☰', label: 'Список' },
  { key: 'map', icon: '🗺️', label: 'Карта' },
];

const DEFAULT_FILTERS = {
  types: [],
  rooms: [],
  priceRange: [1000000, 50000000],
  areaRange: [20, 500],
  onlyNew: false,
};

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initType = searchParams.get('type') || '';
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    types: initType ? [initType] : [],
  });
  const [view, setView] = useState('grid');
  const [currency, setCurrency] = useState('KZT');
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filters.types.length && !filters.types.includes(p.type)) return false;
      if (filters.rooms.length) {
        const match = filters.rooms.some(r => {
          if (r === 'Студия') return p.rooms === 0;
          if (r === '4+') return p.rooms >= 4;
          return p.rooms === Number(r);
        });
        if (!match) return false;
      }
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      if (p.area < filters.areaRange[0] || p.area > filters.areaRange[1]) return false;
      if (filters.onlyNew && !p.isNew) return false;
      return true;
    });
  }, [filters]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const CURRENCIES_LABELS = { KZT: '₸ Тенге', USD: '$ Доллар', RUB: '₽ Рубли' };

  return (
    <div className="catalog-page">
      <Container fluid className="px-3 px-lg-4">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
          <div>
            <h1 className="section-title mb-0">Каталог объектов</h1>
            <small className="text-muted">Найдено: <strong>{filtered.length}</strong> объектов</small>
          </div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* Currency */}
            <ButtonGroup size="sm">
              {CURRENCIES.map(c => (
                <Button
                  key={c}
                  variant={currency === c ? 'dark' : 'outline-secondary'}
                  onClick={() => setCurrency(c)}
                  title={CURRENCIES_LABELS[c]}
                >
                  {c}
                </Button>
              ))}
            </ButtonGroup>
            {/* View toggle */}
            <ButtonGroup size="sm" className="view-toggle">
              {VIEWS.map(v => (
                <Button
                  key={v.key}
                  variant="outline-secondary"
                  className={view === v.key ? 'active' : ''}
                  onClick={() => setView(v.key)}
                  title={v.label}
                >
                  {v.icon} {v.label}
                </Button>
              ))}
            </ButtonGroup>
            {/* Mobile filter btn */}
            <Button variant="outline-secondary" size="sm" className="d-lg-none" onClick={() => setShowOffcanvas(true)}>
              🔧 Фильтры {filters.types.length + filters.rooms.length > 0 && <Badge bg="warning" text="dark" className="ms-1">{filters.types.length + filters.rooms.length}</Badge>}
            </Button>
          </div>
        </div>

        {/* Map view */}
        {view === 'map' ? (
          <div className="split-view rounded overflow-hidden" style={{ border: '1px solid #e0e0e0' }}>
            <div className="split-list">
              <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
            </div>
            <div className="split-map">
              <PropertiesMap properties={filtered} />
            </div>
          </div>
        ) : (
          <Row className="g-4">
            {/* Sidebar */}
            <Col lg={3} className="d-none d-lg-block">
              <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
            </Col>

            {/* Results */}
            <Col lg={9}>
              {filtered.length === 0 ? (
                <div className="text-center py-5">
                  <div style={{ fontSize: '4rem' }}>🔍</div>
                  <h4 style={{ color: 'var(--primary)' }}>Ничего не найдено</h4>
                  <p className="text-muted">Попробуйте изменить фильтры</p>
                  <Button className="btn-primary-domus" onClick={resetFilters}>Сбросить фильтры</Button>
                </div>
              ) : view === 'grid' ? (
                <Row className="g-4">
                  {filtered.map(p => (
                    <Col sm={6} xl={4} key={p.id}>
                      <PropertyCard property={p} currency={currency} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div>
                  {filtered.map(p => (
                    <div key={p.id} className="property-list-item">
                      <img src={p.images[0]} alt={p.title} style={{ width: 200, objectFit: 'cover' }} />
                      <div className="property-list-body">
                        <div>
                          <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                            <h5 style={{ margin: 0, color: 'var(--primary)', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>{p.title}</h5>
                            <Badge bg="secondary" className="flex-shrink-0">{p.type}</Badge>
                          </div>
                          <div className="property-address">📍 {p.address}</div>
                          <div className="property-meta mb-2">
                            <span>📐 {p.area} м²</span>
                            {p.floor > 0 && <span>🏢 {p.floor}/{p.totalFloors} эт.</span>}
                            <span>{p.rooms === 0 ? 'Студия' : p.rooms + '-комн.'}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#777', margin: 0 }}>{p.description.slice(0, 100)}...</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="property-price">{p.priceDrop && '📉 '}{(p.price / 1000000).toFixed(1)} млн ₸</div>
                          <Button size="sm" className="btn-primary-domus" href={`/catalog/${p.id}`}>Подробнее</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>

      {/* Mobile Offcanvas filters */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)' }}>Фильтры</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterSidebar filters={filters} onChange={setFilters} onReset={() => { resetFilters(); setShowOffcanvas(false); }} />
          <Button className="btn-primary-domus w-100 mt-3" onClick={() => setShowOffcanvas(false)}>
            Показать {filtered.length} объектов
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
