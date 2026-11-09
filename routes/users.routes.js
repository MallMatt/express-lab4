const router = require('express').Router();
const { body } = require('express-validator');
const usersController = require('../controllers/users.controller');

// Trasa z req.query (MUSI być przed /:id) - Zadanie 4.2b
router.get('/search', usersController.getAll); 

// Trasy GET
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);

// Trasa POST z walidacją - Zadanie 4.4
router.post('/',
    body('name').trim().notEmpty().withMessage('Imię nie może być puste'),
    body('email').isEmail().withMessage('Podaj poprawny adres email'),
    usersController.create
);

// Trasa DELETE
router.delete('/:id', usersController.remove);

module.exports = router;