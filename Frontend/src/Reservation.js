import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: #0077b6;
`;

const Subtitle = styled.h2`
  color: #0077b6;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #0077b6;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f8a;
  }
`;

const ConfirmationMessage = styled.div`
  background-color: #e7f9e7;
  border: 1px solid #a3d9a3;
  padding: 20px;
  border-radius: 10px;
  color: #2d7a2d;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Reservation = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    axios.get(`https://nazwa-backend-app.azurewebsites.net/api/equipment/${id}`)
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((error) => console.error('Błąd podczas pobierania danych sprzętu:', error));
  }, [id]);

  const calculateTotalPrice = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    return days * equipment.PricePerDay;
  };

  const handleSubmitDates = (e) => {
    e.preventDefault();
    const price = calculateTotalPrice(startDate, endDate);
    setTotalPrice(price);
    setShowUserForm(true);
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    axios.post('https://nazwa-backend-app.azurewebsites.net/api/rentals', {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      EquipmentID: id,
      RentalStartDate: startDate,
      RentalEndDate: endDate,
      RentalQuantity: 1,
      TotalPrice: totalPrice,
    })
      .then(() => {
        setSuccess(true);
        setConfirmation(`Rezerwacja zakończona sukcesem! Sprzęt ID: ${id}, Imię: ${firstName}, Nazwisko: ${lastName}, Email: ${email}, Nr telefonu: ${phone}, Data rozpoczęcia: ${startDate}, Data zakończenia: ${endDate}, Kwota końcowa: ${totalPrice} PLN`);
      })
      .catch((error) => {
        console.error('Błąd podczas rezerwacji:', error);
        alert('Wystąpił błąd podczas rezerwacji. Spróbuj ponownie.');
      });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container>
      <Title>Rezerwuj sprzęt</Title>
      {equipment && <Subtitle>{equipment.Name}</Subtitle>}
      {success ? (
        <ConfirmationMessage>
          <p>{confirmation}</p>
        </ConfirmationMessage>
      ) : showUserForm ? (
        <Form onSubmit={handleSubmitReservation}>
          <div>
            <Label htmlFor="startDate">Data rozpoczęcia:</Label>
            <Input
              type="text"
              id="startDate"
              value={startDate}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="endDate">Data zakończenia:</Label>
            <Input
              type="text"
              id="endDate"
              value={endDate}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="firstName">Imię:</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Nazwisko:</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Nr telefonu:</Label>
            <Input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Kwota końcowa: {totalPrice} PLN</p>
          </div>
          <Button type="submit">Potwierdź rezerwację</Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmitDates}>
          <div>
            <Label htmlFor="startDate">Data rozpoczęcia:</Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">Data zakończenia:</Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Rezerwuj</Button>
        </Form>
      )}
    </Container>
  );
};

export default Reservation;