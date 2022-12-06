//rutas usuarios

const router = require("express").Router()

const usuarioController = require('../controllers/usuario.controller')

const validate = require('../middlewares/validate')
const usuarioScheme = require('../middlewares/schemes/usuarios.scheme')
const globalConstants = require('../const/globalConstants')

const multer = require('multer')

var upload = multer({
    dest: 'uploads/archivos-usuarios/',
    limits: { fileSize: globalConstants.MAX_FILE_SIZE}

})

router.post('/subirArchivo', upload.single('jpg'), usuarioController.subirArchivo)
router.post('/descargarArchivo', usuarioController.descargarArchivo)

router.get('/', usuarioController.listar)

router.post('/', validate(usuarioScheme.crearUsuario), usuarioController.crear)

router.get('/:idUsuario', usuarioController.listarInfo)

module.exports = router