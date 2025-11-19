import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div 
      className={`card ${hover ? '' : 'no-hover'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
