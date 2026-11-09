const { validationResult } = require('express-validator');
const usersService = require('../services/users.service');

// Pobieranie wszystkich i wyszukiwanie
const getAll = async (req, res) => {
    const { name } = req.query; // Zadanie 4.2 - req.query
    const users = await usersService.getUsers();

    if (name) {
        const filtered = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
        return res.json(filtered);
    }
    res.json(users);
};

// Pobieranie po ID
const getById = async (req, res) => {
    const id = Number(req.params.id); // Zadanie 4.2 - req.params
    const users = await usersService.getUsers();
    
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'Nie znaleziono użytkownika' });
    }
    res.json(user);
};

// Dodawanie użytkownika
const create = async (req, res) => {
    // Sprawdzenie błędów walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body; // Zadanie 4.3 - req.body
    const users = await usersService.getUsers();
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    };
    
    users.push(newUser);
    await usersService.saveUsers(users);
    
    res.status(201).json(newUser);
};

// Usuwanie użytkownika
const remove = async (req, res) => {
    const id = Number(req.params.id);
    let users = await usersService.getUsers();
    
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    
    if (users.length === initialLength) {
        return res.status(404).json({ message: 'Nie znaleziono użytkownika' });
    }
    
    await usersService.saveUsers(users);
    res.status(204).send();
};

module.exports = { getAll, getById, create, remove };