import React from 'react';
import './CardShimmer.css';

const CardShimmer = () => {
  return (
    <div className="card shimmer-card">
      <div className="shimmer-poster"></div>
      <div className="shimmer-text shimmer-title"></div>
      <div className="shimmer-text shimmer-year"></div>
      <div className="shimmer-text shimmer-rating"></div>
    </div>
  );
};

export default CardShimmer;
