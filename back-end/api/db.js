import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  // configuração de acesso
  host: '127.0.0.1',
  database: 'loja',
  user: 'root',
  password: '12345678',
  port: 3306,

  // configuração das conexões
  multipleStatements: true,

  // configuração da pool
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool