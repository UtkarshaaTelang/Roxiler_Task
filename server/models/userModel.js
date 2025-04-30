const db = require('../config/db');

const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user.name, user.email, user.password, user.address, user.role], callback);
};

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err, null);  
    }

    callback(null, result); 
  });
};

module.exports = { createUser, findUserByEmail };
