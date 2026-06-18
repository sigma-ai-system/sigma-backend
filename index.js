const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger'); // Mengarah ke loader baru

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Jalankan Swagger UI menggunakan dokumen YAML yang sudah di-parsing
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📑 Dokumentasi API tersedia di http://localhost:${PORT}/api-docs`);
});