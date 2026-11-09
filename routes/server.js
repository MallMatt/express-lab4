const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routes/users.routes');

const app = express();
const port = process.env.PORT || 3000;

// 1. Wbudowane middleware (Zadanie 4.3)
app.use(express.json()); // Parsowanie JSON
app.use(express.urlencoded({ extended: false })); // Parsowanie formularzy
app.use(express.static('public')); // Pliki statyczne z folderu public

// 2. Własne middleware (Zadanie 4.3)
app.use(logger);

// 3. Routing (Zadanie 4.1 i 4.5)
app.get('/api/info', (req, res) => {
    res.json({
        application: 'Express LAB4',
        version: '1.0'
    });
});

// Podłączenie routera użytkowników
app.use('/api/users', usersRouter);

// 4. Obsługa błędu 404 (Zadanie 4.5)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Nie znaleziono takiej ścieżki' });
});

// 5. Centralna obsługa błędów (Zadanie 4.5) - Zawsze na samym końcu!
app.use(errorHandler);

// 6. Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});