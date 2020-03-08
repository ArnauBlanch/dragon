import React from 'react';
import Media from 'react-media';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header: React.FC = () => (
  <Media query="(max-width: 799px)">
    {(matches) => (matches ? <MobileHeader /> : <DesktopHeader />)}
  </Media>
);

export default Header;
