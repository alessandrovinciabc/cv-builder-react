import React from 'react';

import './Header.css';

function Header(props) {
  return (
    <div className="Header">
      {props.logo && <div className="Header__logo">{props.logo}</div>}
      {props.children}
    </div>
  );
}

export default Header;
