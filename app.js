const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

const users = require('./routes/api/users');

const config = dotenv.config();
const PORT = process.env.PORT || 5000;

// инициализируем приложение
const app = express();

// Middlewares
// Form data middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

// JSON bodyParser middleware
app.use(bodyParser.json());

// CORS
app.use(cors());

// Настройки для статической папки
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());

// Passport strategy
require('./config/passport')(passport);

// Адресс api
app.use('/api/users', users);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/', (req, res) => {
  res.send('<h1>SERVER IS RUNNING!</h1>')
});

// Запуск сервера
const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    await app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
