const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Users = require('../models/Users');

const generateAccessToken = (_id, name, username, email) => {
  const payload = {
    _id,
    name,
    username,
    email
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserControllers {
  async register(req, res) {
    try {
      const { name, username, phone, email, password } = req.body;

      // Проверка username пользователя
      const candidateUsername = await Users.findOne({ username });

      if (candidateUsername) {
        return res.status(400).json({ message: 'username is already taken!' });
      }

      // Проверка phone number пользователя
      const candidatePhone = await Users.findOne({ phone });

      if (candidatePhone) {
        return res.status(400).json({ message: 'user phone number is already taken!' });
      }

      // Проверка email пользователя
      const candidateEmail = await Users.findOne({ email });

      if (candidateEmail) {
        return res.status(400).json({ message: 'user email is already taken!' });
      }

      // Хеширование пароля
      const hashPassword = bcrypt.hashSync(password, 7);

      const user = new Users({ name, username, phone, email, password: hashPassword });

      if (user) {
        await user.save();

        return res.status(201).json({ success: true, message: 'User registered!' });
      }

    } catch (e) {
      console.log(e);
      e.status(400).json({ success: false, message: 'Registration error!' });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User email isn\'t found!' });
      }

      // Сравнение паролей
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Incorrect password!` });
      }

      // Создание accessToken
      const accessToken = generateAccessToken(user._id, user.name, user.username, user.email);

      return res.status(200).json({
        success: true,
        token: `Bearer ${accessToken}`,
        user: user,
        message: 'Your are logged in!'
      });
    } catch (e) {
      console.log(e);
      e.status(400).json({ success: false, message: 'Authorization error!' });
    }
  };

  async profile(req, res) {
    return res.json({ user: req.user });
  };
}

module.exports = new UserControllers();
