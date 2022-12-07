// rutas auth

const router = require("express").Router()

const authController = require('../controllers/auth.controller')

const validate = require('../middlewares/validate')
const authScheme = require('../middlewares/schemes/auth.scheme')


router.post('/login', validate(authScheme.login), authController.login)
/router.post('/signin', authController.signin)

module.exports = router