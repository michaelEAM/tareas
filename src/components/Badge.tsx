import React from 'react';

interface BadgeProps {
  text: string;
  color: string;
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, color, icon }) => {
  return (
    <span className={`${color} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1`}>
      {icon && <span>{icon}</span>}
      {text}
    </span>
  );
};
