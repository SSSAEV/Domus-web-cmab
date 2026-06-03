import React, { useState, useMemo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Slider from 'rc-slider';

ChartJS.register(ArcElement, Tooltip, Legend);

function formatNum(n) {
  return n.toLocaleString('ru-RU');
}

export default function MortgageCalc() {
  const [propertyPrice, setPropertyPrice] = useState(15000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [term, setTerm] = useState(20);
  const [rate, setRate] = useState(14);

  const calc = useMemo(() => {
    const downPayment = Math.round(propertyPrice * downPaymentPct / 100);
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = loanAmount / months;
    } else {
      monthly = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalPay = monthly * months;
    const overpay = totalPay - loanAmount;
    return {
      downPayment,
      loanAmount,
      monthly: Math.round(monthly),
      totalPay: Math.round(totalPay),
      overpay: Math.round(overpay),
    };
  }, [propertyPrice, downPaymentPct, term, rate]);

  const chartData = {
    labels: ['Тело кредита', 'Переплата банку'],
    datasets: [{
      data: [calc.loanAmount, calc.overpay],
      backgroundColor: ['#0A192F', '#FFB800'],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatNum(ctx.parsed)} ₸`,
        },
      },
    },
  };

  return (
    <Row className="g-4">
      <Col lg={6}>
        <div className="mortgage-form-card">
          <h4 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
            Параметры ипотеки
          </h4>

          <Form.Group className="mb-3">
            <Form.Label>Стоимость недвижимости</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                value={propertyPrice}
                onChange={e => setPropertyPrice(Number(e.target.value))}
                min={1000000}
                max={200000000}
                step={500000}
              />
              <span className="input-group-text">₸</span>
            </div>
            <small className="text-muted">{formatNum(propertyPrice)} ₸</small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Первоначальный взнос: {downPaymentPct}% — {formatNum(calc.downPayment)} ₸</Form.Label>
            <Slider min={10} max={90} step={1} value={downPaymentPct} onChange={setDownPaymentPct} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Срок кредита</Form.Label>
            <Form.Select value={term} onChange={e => setTerm(Number(e.target.value))}>
              {[5, 10, 15, 20, 25, 30].map(y => (
                <option key={y} value={y}>{y} лет</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Процентная ставка</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                min={1}
                max={50}
                step={0.1}
              />
              <span className="input-group-text">%</span>
            </div>
          </Form.Group>
        </div>
      </Col>

      <Col lg={6}>
        <div className="mortgage-result-card h-100">
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
            Ежемесячный платеж
          </p>
          <div className="monthly-payment mb-3">{formatNum(calc.monthly)} ₸</div>

          <Row className="g-3 mb-4">
            <Col xs={6}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.75rem' }}>
                <div className="overpay-label">Сумма кредита</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatNum(calc.loanAmount)} ₸</div>
              </div>
            </Col>
            <Col xs={6}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.75rem' }}>
                <div className="overpay-label">Переплата</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>{formatNum(calc.overpay)} ₸</div>
              </div>
            </Col>
            <Col xs={6}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.75rem' }}>
                <div className="overpay-label">Первый взнос</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatNum(calc.downPayment)} ₸</div>
              </div>
            </Col>
            <Col xs={6}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.75rem' }}>
                <div className="overpay-label">Всего выплат</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatNum(calc.totalPay)} ₸</div>
              </div>
            </Col>
          </Row>

          <div style={{ maxWidth: 260, margin: '0 auto' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
