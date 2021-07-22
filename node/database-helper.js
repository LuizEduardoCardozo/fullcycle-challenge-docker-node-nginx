const mysql = require('mysql')

const connectToDatabase = () => {
    const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        database:'db'
    };
    const connection = mysql.createConnection(config);
    return connection;
}

const disconnectDatabase = (connection) => {
    connection.end();
}

const createUser = (username, connection) => {
    const createUserQuery = `INSERT INTO users(name) values('${username}')`;
    connection.query(createUserQuery);
}

const createUsersTable = (connection) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS users(
        id int AUTO_INCREMENT NOT NULL,
        name varchar(255) NOT NULL,
        PRIMARY KEY (id)
    )`;
    connection.query(createTableQuery);
}

const findAllUsers = (connection) => {
    const findUsersQuery = 'SELECT name FROM users'
    return new Promise((resolve, reject) => {
        connection.query(findUsersQuery, (err, res) => {
            resolve(res)
        });
    });
};

const setUpDatabase = () => {
    const connection = connectToDatabase()
    createUsersTable(connection);

    createUser('Eduardo', connection)
    createUser('Wesley', connection)

    disconnectDatabase(connection);
}

module.exports = {
    connectToDatabase,
    setUpDatabase,
    findAllUsers,
    disconnectDatabase,
}

