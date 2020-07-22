import React from 'react';

interface Props {
  className?: string;
}

const MenuIcon: React.FC<Props> = ({ className }: Props) => (
  <svg
    className={`fill-current ${className !== undefined ? className : ''}`}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

export default MenuIcon;
