const UserRoutes = require('express').Router();

const {getAll, create} = require('./user.controller');

UserRoutes.get('/', getAll)
UserRoutes.post('/', create)

module.exports = CharacterRoutes