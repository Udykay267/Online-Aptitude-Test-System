const admin = require('firebase-admin');
const serviceAccount = require('./firebase-secret.json'); // Replace with actual file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;