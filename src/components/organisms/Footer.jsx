import React from "react";

const Footer = () => {
  return (
    <footer style={{
      marginTop: '40px',
      background: '#0b0b0b',
      borderTop: '1px solid #111318'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/assets/img/icon.png" alt="Level UP Store Logo" style={{ width: '28px', height: '28px' }} />
          <p style={{ margin: 0, color: '#cbd5e1' }}>© {new Date().getFullYear()} Level UP Store</p>
        </div>
        <nav aria-label="Redes sociales" style={{ display: 'flex', gap: '14px' }}>
          <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '6px 8px', borderRadius: '6px' }}>Instagram</a>
          <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '6px 8px', borderRadius: '6px' }}>Twitter</a>
          <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '6px 8px', borderRadius: '6px' }}>Facebook</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

