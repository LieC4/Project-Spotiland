const UserRoutes = require("express").Router();
const rateLimit = require("express-rate-limit");
const { authorize } = require("../../middleware/auth");


const { getAllUsers, register, login, userById, update, remove } = require("./user.controller");


const userCreateRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

UserRoutes.get('/getAll', getAllUsers);
UserRoutes.post('/register', [userCreateRateLimit], register);
UserRoutes.post('/login', login);
UserRoutes.get('/:id', [authorize], userById);
UserRoutes.patch('/:id', [authorize], update);
UserRoutes.delete('/:id', [authorize], remove);

module.exports = UserRoutes;