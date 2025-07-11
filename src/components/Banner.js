import React, { useEffect, useState } from 'react';
import './Banner.css';

function Banner() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="banner-container">
      <div
        className="banner-image"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      <div className="banner-text">
        <h2>Ideas</h2>
        <p>Where all our great things begin</p>
      </div>
    </div>
  );
}

export default Banner;
