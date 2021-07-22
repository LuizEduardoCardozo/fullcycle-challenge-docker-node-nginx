const express = require('express')
const app = express()
const port = 3000

const {
    connectToDatabase,
    setUpDatabase,
    findAllUsers,
    disconnectDatabase,
} = require('./database-helper');

setUpDatabase()

app.get('/', async (req,res) => {

    const connection = connectToDatabase()
    const users = await findAllUsers(connection);
    disconnectDatabase(connection);
    
    let userItens = '';
    users.forEach(user => {
        userItens += `<li>${user.name}</li>`
    })

    res.send(`<h1>Full Cycle</h1><ul>${userItens}</ul>`)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})