const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Missing authorization header' });
    } else {
      const splitAuth = authHeader.split(' ');
      const token = splitAuth[1] ? splitAuth[1] : splitAuth[0];
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Invalid Credentials' });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    }
  } catch (err) {
    res.status(500).json('There was an error authenticating the request.');
  }
};
