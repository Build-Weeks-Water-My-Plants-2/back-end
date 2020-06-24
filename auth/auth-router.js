const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../users/user-model.js');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    phone_number: user.phone_number,
    avatar_url: user.avatar_url
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/register', async (req, res) => {
  const userData = req.body;
  let { username, password } = req.body;

  // make these middleware...
  if (username === '' || password === '') {
    res.status(422).json({ message: 'Username and password cannot be blank.' });
  } else if (typeof username === 'undefined' ||
        typeof password === 'undefined') {
    res.status(400).json({ message: 'Username and password required.' });
  } else {
    try {
      const hash = bcrypt.hashSync(password, 8);
      userData.password = hash;
      const saved = await Users.add(userData);
      const token = generateToken(saved);
      res.status(201).json({data: saved, token});
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  if (username === '' || password === '') {
    res.status(422).json({ message: 'Username and password cannot be blank.' });
  } else if (typeof username === 'undefined' ||
        typeof password === 'undefined') {
    res.status(400).json({ message: 'Username and password required.' });
  } else {
    try {
      const user = await Users.findBy({ username }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials'});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
