import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #0077b6;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f8a;
  }
`;

const EquipmentCard = ({ item }) => {
  const navigate = useNavigate();

  const handleReservation = () => {
    navigate(`/reservation/${item.EquipmentID}`);
  };

  return (
    <Card>
      <Title>{item.Name}</Title>
      <Info>Kategoria: {item.CategoryID}</Info>
      <Info>Ilość: {item.Quantity}</Info>
      <Info>Cena za dzień: {item.PricePerDay} PLN</Info>
      <Button onClick={handleReservation}>Rezerwuj</Button> {/* Dodaj przycisk do rezerwacji */}
    </Card>
  );
};

export default EquipmentCard;