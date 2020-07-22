import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import MenuIcon from '../MenuIcon';
import MenuItems from './MenuItems';
import ScanButton from './ScanButton';

interface State {
  menuOpen: boolean;
}

class AppHeader extends React.Component<{}, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { menuOpen: false };
    this.closeMenu = this.closeMenu.bind(this);
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <nav className="sticky top-0 z-50 gradient py-1 px-4 h-14 select-none shadow-md">
        <div className="flex items-center justify-between mx-auto max-w-4xl">
          <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6 py-2">
            <Logo className="h-6 w-6 mr-2" />
            <span className="font-semibold text-xl tracking-tight">dragon</span>
          </Link>

          <div className="flex h-8">
            <ScanButton onClick={this.closeMenu} />
            <button
              type="button"
              className="md:hidden px-3 text-white border-white border rounded-full focus:outline-none active:text-red-300 active:border-red-300"
              onClick={() => this.setState({ menuOpen: !menuOpen })}
            >
              <MenuIcon className="h-3 w-3" />
            </button>
            <MenuItems
              className="hidden md:flex"
              listClassName="text-right"
              onClick={this.closeMenu}
            />
          </div>
        </div>
        <MenuItems
          className={`flex md:hidden ${!menuOpen && 'hidden'}`}
          listClassName="mb-2"
          onClick={this.closeMenu}
        />
      </nav>
    );
  }
}

export default AppHeader;
