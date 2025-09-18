const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({message: 'You are not logged in'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        req.user = user;
        next();
    } catch (err) {
        return res.json({message:err.message});
    }
};

module.exports = { authUser };