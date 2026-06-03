import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Имя обязательно'),
  phone: Yup.string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +7 (XXX) XXX-XX-XX')
    .required('Телефон обязателен'),
  budget: Yup.string().required('Выберите бюджет'),
  comment: Yup.string(),
});

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  let result = '+7';
  if (digits.length > 1) result += ' (' + digits.slice(1, 4);
  if (digits.length > 4) result += ') ' + digits.slice(4, 7);
  if (digits.length > 7) result += '-' + digits.slice(7, 9);
  if (digits.length > 9) result += '-' + digits.slice(9, 11);
  return result;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', phone: '', budget: '', comment: '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      await new Promise(r => setTimeout(r, 1500));
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  return (
    <div className="contact-form-card">
      <h4 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem' }}>
        Заявка на подбор недвижимости
      </h4>

      {submitted && (
        <Alert variant="success" className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.3rem' }}>✅</span>
          <div>
            <strong>Заявка отправлена!</strong> Наш менеджер свяжется с вами в течение 1 рабочего дня.
          </div>
        </Alert>
      )}

      <Form onSubmit={formik.handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Имя *</Form.Label>
              <Form.Control
                name="name"
                placeholder="Иван Иванов"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && !!formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Телефон *</Form.Label>
              <Form.Control
                name="phone"
                placeholder="+7 (777) 777-77-77"
                value={formik.values.phone}
                onChange={e => formik.setFieldValue('phone', formatPhone(e.target.value))}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.phone && !!formik.errors.phone}
                isValid={formik.touched.phone && !formik.errors.phone}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Бюджет *</Form.Label>
              <Form.Select
                name="budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.budget && !!formik.errors.budget}
                isValid={formik.touched.budget && !formik.errors.budget}
              >
                <option value="">Выберите бюджет...</option>
                <option value="lt5">До 5 млн ₸</option>
                <option value="5to10">5 – 10 млн ₸</option>
                <option value="10to20">10 – 20 млн ₸</option>
                <option value="gt20">Более 20 млн ₸</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.errors.budget}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Комментарий</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                placeholder="Расскажите о требованиях к квартире..."
                value={formik.values.comment}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button type="submit" className="btn-gold w-100 py-2" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <><Spinner animation="border" size="sm" className="me-2" />Отправка...</>
              ) : (
                '📩 Отправить заявку'
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
