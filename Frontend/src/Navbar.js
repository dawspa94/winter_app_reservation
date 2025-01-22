import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #0077b6;
  color: white;
`;

const Button = styled.button`
  background-color: #00b4d8;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0096c7;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <NavbarContainer>
      <h1>Winter Rental</h1>
      <div>
        <Button onClick={() => navigateTo('/')}>Home</Button>
        <Button onClick={() => navigateTo('/equipment')}>Sprzęt</Button>
        <Button onClick={() => navigateTo('/login')}>Logowanie</Button>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;