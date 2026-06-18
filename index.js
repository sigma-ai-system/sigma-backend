const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger'); // Mengarah ke loader baru

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

// Tambahkan variabel URL CDN untuk CSS dan JS Swagger
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const JS_URL = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-standalone-preset.js"
];

// Setup Swagger UI dengan custom CSS dan JS
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { 
    customCssUrl: CSS_URL,
    customJs: JS_URL
  })
);

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📑 Dokumentasi API tersedia di http://localhost:${PORT}/api-docs`);
});