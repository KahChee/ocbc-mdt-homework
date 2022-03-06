import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../common/sharedComponents/form/Button';

const Footer = () => {
  return (
    <>
      <NavLink to="/transfer">
        <Button>MAKE TRANSFER</Button>
      </NavLink>
    </>
  )
}

export default Footer