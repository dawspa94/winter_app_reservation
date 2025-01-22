import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/booking', { equipmentId: id, startDate, endDate })
      .then(() => setSuccess(true))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Rezerwuj sprzęt</h1>
      {success ? (
        <p>Rezerwacja zakończona sukcesem!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Data początkowa:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <br />
          <label>
            Data końcowa:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <br />
          <button type="submit">Zarezerwuj</button>
        </form>
      )}
    </div>
  );
};

export default Booking;