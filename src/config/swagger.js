const YAML = require('yamljs');
const path = require('path');

// Gunakan process.cwd() untuk memastikan path benar saat di-deploy ke Vercel
const yamlPath = path.join(process.cwd(), 'src/config/swagger.yaml');
const swaggerDocument = YAML.load(yamlPath);

module.exports = swaggerDocument;