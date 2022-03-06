import React from 'react';
import Header from './Header';

const Layout = ({ children, footer, ...props }) => {
  return (
    <div className="main-container">
      <div>
        <Header {...props} />
        { children }
      </div>
      <footer>
        { footer }
      </footer>
    </div>
  )
}

export default Layout