//rutas usuarios

const router = require("express").Router()

const usuarioController = require('../controllers/usuario.controller')

const validate = require('../middlewares/validate')
const usuarioScheme = require('../middlewares/schemes/usuarios.scheme')

router.get('/', usuarioController.listar)

router.post('/', validate(usuarioScheme.crearUsuario), usuarioController.crear)

router.get('/:idUsuario', usuarioController.listarInfo)

module.exports = router