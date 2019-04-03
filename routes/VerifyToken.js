var jwt = require('jsonwebtoken');
var config = require('../config/enviromentVariables');

//This bit of middleware will only accept requests from logged in users
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    //Everything good?

    
    next();
  });
}

module.exports = verifyToken;