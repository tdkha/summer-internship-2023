const validateInfoSufficiency = (req, res, next) => {
        const user_info = req.body.user_info;
            const structured_info = {      
                firstname:null,
                lastname:null,
                email: null,
                phone:null,
                address:null,
                username: null,
                password: null
            }
            if(!user_info){
                return res.status(400).json({response:"Missing information"}); //missing information
            }

            for (const info in structured_info) {
                if(!user_info.hasOwnProperty(info)){
                    return res.sendStatus(403);
                }
                if(!info){
                    return res.status(400).json({response:"Missing information"}); //missing information
                }
            }
            next();
}

module.exports = validateInfoSufficiency