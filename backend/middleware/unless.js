//------------------------------------------------
// Function to exclude routes from middleware
//------------------------------------------------
const unless = (paths, middleware) => {
    return function(req, res, next) {
        for (const path of paths ){
            if (path === req.baseUrl) {
                return next();
            } else {
                return middleware(req, res, next);
            }
        }     
    };
};
module.exports = unless