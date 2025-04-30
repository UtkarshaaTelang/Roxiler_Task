const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { createUser, findUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, address } = req.body;
  const allowedRoles = ['normal', 'admin', 'store_owner'];
if (!allowedRoles.includes(role)) {
  return res.status(400).json({ msg: 'Invalid role selected' });
}

  findUserByEmail(email, async (err, result) => {
    if (err) {
      console.error('Database error during email check:', err);
      return res.status(500).json({ msg: 'Server error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      createUser({ name, email, password: hashedPassword, address, role }, (err, result) => {
        if (err) {
          console.error('Error while creating user:', err);
          return res.status(500).json({ msg: 'Database error while creating user' });
        }

        res.status(201).json({ msg: 'User registered successfully' });
      });
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      res.status(500).json({ msg: 'Error securing password' });
    }
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, async (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ msg: 'Invalid credentials' });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
};
