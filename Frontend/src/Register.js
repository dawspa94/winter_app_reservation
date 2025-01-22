import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user'); // Domyślnie 'user', może być 'admin'
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { name, email, password, role });
      setSuccess(true);
    } catch (err) {
      setError('Rejestracja nie powiodła się');
    }
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Imię:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Rola:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Użytkownik</option>
            <option value="admin">Administrator</option>
          </select>
        </label>
        <br />
        {success && <p style={{ color: 'green' }}>Rejestracja zakończona sukcesem!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;