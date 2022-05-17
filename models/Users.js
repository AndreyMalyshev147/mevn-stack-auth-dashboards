const { Schema, model } = require('mongoose');

// Создаём схему пользователя
const Users = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model('Users', Users);
