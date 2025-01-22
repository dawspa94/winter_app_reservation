const express = require('express');
const cors = require('cors'); // Importuj pakiet cors
const sequelize = require('./config/database');
const equipmentRoutes = require('./routes/equipment');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Zezwól tylko na żądania z tego pochodzenia
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Użyj cors z opcjami
app.use(express.json());
app.use(equipmentRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});