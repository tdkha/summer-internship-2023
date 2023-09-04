
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function getEncryptedInfoByToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          reject(new Error("Failed to decode JWT token")); // Reject the promise with an error
        } else {
          const jsonData = {
            user_id: decoded.user_id,
            roles: decoded.roles
          };
          resolve(jsonData); // Resolve the promise with the jsonData
        }
      });
    });
  }
  
  module.exports = { getEncryptedInfoByToken };