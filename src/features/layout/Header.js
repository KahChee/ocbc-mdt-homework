import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { logout } from '../../common/authentication';
import './style.css';

const Header = ({ title, backBtn, logoutBtn }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  
  return (
    <header>
      <div className="navigation-container d-flex justify-content-between align-items-center">
        <div>
          {
            backBtn ? 
            <Button title="Back" variant="link" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} color="black" stroke="black" strokeWidth={1} />
            </Button> : 
            <>&nbsp;</>
          }
        </div>
        <div>
          { logoutBtn ? <Button title="Logout" variant="link" onClick={handleLogout}>Logout</Button> : <>&nbsp;</> }
        </div>
      </div>
      { title ? <h1>{ title }</h1> : <h1 style={{ display: 'none' }}>MDT HOMEWORK</h1> }
    </header>
  )
}

export default Header