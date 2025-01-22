import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formularz wysłany');
    try {
      // Sprawdzenie, czy dane logowania to "admin" i "admin"
      if (login === 'admin' && password === 'admin') {
        console.log('Zalogowano jako admin');
        // Przekieruj do panelu admina
        navigate('/admin');
      } else {
        // Jeśli nie, wysyłamy żądanie do backendu
        const response = await axios.post('http://localhost:4000/api/auth/login', { login, password });
        console.log('Zalogowano pomyślnie:', response.data);
        // Zapisz token w localStorage lub w stanie aplikacji
        localStorage.setItem('token', response.data.token);
        // Przekieruj do panelu admina
        navigate('/admin');
      }
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      setError('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Logowanie</Title>
        <Label>
          Login:
          <Input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </Label>
        <Label>
          Hasło:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Zaloguj się</Button>
      </Form>
    </Container>
  );
};

export default Login;