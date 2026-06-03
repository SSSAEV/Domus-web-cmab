import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Button } from 'react-bootstrap';

export default function QRSection({ url = 'https://domus.vercel.app' }) {
  const svgRef = useRef(null);

  const handleDownload = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domus-qr.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center p-4" style={{ background: 'var(--white)', borderRadius: 'var(--radius)', boxShadow: 'var(--card-shadow)' }}>
      <h5 style={{ color: 'var(--primary)', fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>QR-код сайта</h5>
      <div ref={svgRef} style={{ display: 'inline-block', padding: 12, background: '#fff', borderRadius: 8, border: '2px solid var(--light-bg)' }}>
        <QRCode value={url} size={180} />
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.75rem', marginBottom: '1rem' }}>{url}</p>
      <Button className="btn-primary-domus" onClick={handleDownload}>
        ⬇️ Скачать QR-код
      </Button>
    </div>
  );
}
