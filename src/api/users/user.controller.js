const User = require('./user.model');

const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json({
            status: 200,
            message: 'Recovered all users',
            data: { user }
        });
    } catch (error) {
        return next(setError(500, 'Failed all users'));
    }
};

const create = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const newUserInDB = await newUser.save()
        return res.json({
            status: 201,
            message: 'New user created',
            data: {user: newUserInDB}
        });
    } catch (error) {
        return next(setError(500, 'Failed created user'))
    }
}

module.exports = {
    getAll,
    create
    
}
