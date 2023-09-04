const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJWT = (req, res, next) => {
    const authHeader =  req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).send("No access token");
    const token = authHeader.split(" ")[1] // extract the "Bearer"
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN,
        (err, decoded) => {
            console.log(err)
            if (err) return res.status(401).send("Unauthorized"); //invalid token
            next()
        }
    );
}

module.exports = validateJWT
