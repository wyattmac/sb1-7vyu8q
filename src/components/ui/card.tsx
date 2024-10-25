import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props} />
);

export const CardContent: React.FC<CardProps> = ({ className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
);