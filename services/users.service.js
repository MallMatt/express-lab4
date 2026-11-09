const fs = require('node:fs/promises');
const path = require('node:path');

const file = path.join(__dirname, '..', 'data', 'users.json');

async function getUsers() {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
}

async function saveUsers(users) {
    await fs.writeFile(file, JSON.stringify(users, null, 2));
}

module.exports = { getUsers, saveUsers };