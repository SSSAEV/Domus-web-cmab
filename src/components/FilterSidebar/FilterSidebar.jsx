import React from 'react';
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import Slider from 'rc-slider';

const TYPES = ['Квартира', 'Дом', 'Участок'];
const ROOMS = ['Студия', '1', '2', '3', '4+'];

export default function FilterSidebar({ filters, onChange, onReset }) {
  const handleType = (type) => {
    const types = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types });
  };

  const handleRoom = (room) => {
    const rooms = filters.rooms.includes(room)
      ? filters.rooms.filter(r => r !== room)
      : [...filters.rooms, room];
    onChange({ ...filters, rooms });
  };

  return (
    <div className="filter-sidebar">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--primary)', margin: 0 }}>Фильтры</h5>
        <Button variant="link" size="sm" onClick={onReset} style={{ color: '#999', padding: 0 }}>Сбросить</Button>
      </div>

      <h6>Тип объекта</h6>
      {TYPES.map(t => (
        <Form.Check
          key={t}
          type="checkbox"
          label={t}
          checked={filters.types.includes(t)}
          onChange={() => handleType(t)}
          className="mb-1"
        />
      ))}

      <h6>Количество комнат</h6>
      <div className="d-flex flex-wrap gap-1 mb-1">
        {ROOMS.map(r => (
          <button
            key={r}
            className={`btn btn-outline-secondary btn-sm room-btn ${filters.rooms.includes(r) ? 'active' : ''}`}
            onClick={() => handleRoom(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <h6>Цена, ₸</h6>
      <Slider
        range
        min={1000000}
        max={50000000}
        step={500000}
        value={filters.priceRange}
        onChange={val => onChange({ ...filters, priceRange: val })}
      />
      <div className="d-flex justify-content-between mt-2" style={{ fontSize: '0.8rem', color: '#666' }}>
        <span>{(filters.priceRange[0] / 1000000).toFixed(1)} млн ₸</span>
        <span>{(filters.priceRange[1] / 1000000).toFixed(1)} млн ₸</span>
      </div>

      <h6>Площадь, м²</h6>
      <Slider
        range
        min={20}
        max={500}
        step={5}
        value={filters.areaRange}
        onChange={val => onChange({ ...filters, areaRange: val })}
      />
      <div className="d-flex justify-content-between mt-2" style={{ fontSize: '0.8rem', color: '#666' }}>
        <span>{filters.areaRange[0]} м²</span>
        <span>{filters.areaRange[1]} м²</span>
      </div>

      <h6 className="mt-3">Только новостройки</h6>
      <Form.Check
        type="switch"
        label="Новостройки"
        checked={filters.onlyNew}
        onChange={e => onChange({ ...filters, onlyNew: e.target.checked })}
      />
    </div>
  );
}
