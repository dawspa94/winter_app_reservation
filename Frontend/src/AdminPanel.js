import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #0077b6;
`;

const ReservationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReservationItem = styled.li`
  background-color: #f0f8ff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const AdminPanel = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    axios.get('https://nazwa-backend-app.azurewebsites.net/api/rentals')
      .then(response => {
        setRentals(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rentals!', error);
      });
  }, []);

  return (
    <Container>
      <Title>Panel Admina</Title>
      <h2>Wszystkie rezerwacje</h2>
      <ReservationList>
        {rentals.map((rental) => (
          <ReservationItem key={rental.id}>
            <p>Sprzęt ID: {rental.EquipmentID}</p>
            <p>Imię: {rental.FirstName}</p>
            <p>Nazwisko: {rental.LastName}</p>
            <p>Email: {rental.Email}</p>
            <p>Nr telefonu: {rental.Phone}</p>
            <p>Data rozpoczęcia: {rental.RentalStartDate}</p>
            <p>Data zakończenia: {rental.RentalEndDate}</p>
            <p>Kwota końcowa: {rental.TotalPrice} PLN</p>
            <p>Status: {rental.RentalStatus}</p>
          </ReservationItem>
        ))}
      </ReservationList>
    </Container>
  );
};

export default AdminPanel;