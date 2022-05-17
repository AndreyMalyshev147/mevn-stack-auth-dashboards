const Router = require('express');
const passport = require('passport');

const UserControllers = require('../../controllers/userControllers');

const router = new Router();

// Регистрация пользователей
router.post('/register', UserControllers.register);

// Авторизация пользователей
router.post('/login', UserControllers.login);

// Получение конкретного пользователя
router.get('/profile', passport.authenticate('jwt', { session: false }) , UserControllers.profile);

module.exports = router;
