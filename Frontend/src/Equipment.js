import React, { useState, useEffect } from 'react';
import EquipmentCard from './EquipmentCard'; // Upewnij się, że ścieżka jest poprawna
import axios from 'axios';

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    axios.get('https://nazwa-backend-app.azurewebsites.net/api/equipment') // Poprawny URL backendu
      .then((response) => {
        console.log('Dane pobrane z backendu:', response.data); // Wyświetl dane w konsoli, aby sprawdzić, czy są poprawnie pobierane
        setEquipment(response.data);
      })
      .catch((error) => console.error('Błąd podczas pobierania danych:', error));
  }, []);

  return (
    <div>
      <h1>Lista sprzętu</h1>
      <div>
        {equipment.length > 0 ? (
          equipment.map((item) => (
            <EquipmentCard key={item.EquipmentID} item={item} />
          ))
        ) : (
          <p>Ładowanie danych...</p>
        )}
      </div>
    </div>
  );
};

export default Equipment;