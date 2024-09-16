require('dotenv').config();

module.exports = function(req, res, next) {

    if(req.session.isAdmin) { 
        return next(); 
    }
    
    const { adminPassword } = req.body;
    const password = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        return res.status(400).send('Bad Request: Password is required');
    }

    if(adminPassword === password) {
        req.session.isAdmin = true;
        return next();
    }
    
    res.status(401).send('Unauthorized: Incorrect password');
    
};