import React from 'react';
import Loader from '../../common/sharedComponents/Loader';
import Header from './Header';

const Layout = ({ isLoading, children, footer, ...props }) => {
  return (
    <>
      <div className="main-container">
        <div>
          <Header {...props} />
          { children }
        </div>
        <footer>
          { footer }
        </footer>
      </div>
      <Loader isLoading={isLoading} />
    </>
  )
}

export default Layout