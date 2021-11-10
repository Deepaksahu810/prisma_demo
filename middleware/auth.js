var jwt = require('jsonwebtoken');


exports.data = async (req, res,next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).json({"error":"authorization"})
    }
    const data = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(data, 'asdfghjklzxcvbnm');
    next()
}
