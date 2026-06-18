const YAML = require('yamljs');
const path = require('path');

// Membaca file swagger.yaml secara langsung
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

module.exports = swaggerDocument;