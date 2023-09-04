const { getEncryptedInfoByToken } = require("../lib/token/jwtUtils");
const  cookieParser = require('cookie-parser')
const validateRole = async (req, res, next) => {
    try{
        //------------------------------------------------------------------------
        // validating access token from header
        //------------------------------------------------------------------------
        const cookie = req.cookies
        const token = cookie.accessToken
        const decode = await getEncryptedInfoByToken(token)
        const decoded_roles = decode.roles;
        const roles = decoded_roles.map( role => role.toLowerCase());

        //------------------------------------------------------------------------
        // validating roles
        //------------------------------------------------------------------------
        const path = req.baseUrl; // example [ '', 'api', 'student' ]
        const extractedPath = path.split('/')
        const index = extractedPath.indexOf('api') + 1; // <role> followed by <api>
    
        const validRole = roles.includes(extractedPath[index])
        if(!validRole) {
            res.clearCookie("accessToken");
            return res.status(401).json("Unauthorized role");
        }
    }catch(err){
        //res.clearCookie("accessToken");
        return res.status(401).json("Unauthorized role");
        
    }
    next();
}

module.exports = validateRole