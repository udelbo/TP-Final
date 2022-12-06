//rutas medicos

const router = require("express").Router()

const medicoController = require('../controllers/medico.controller')

const validate = require('../middlewares/validate')
const medicoScheme = require('../middlewares/schemes/medicos.scheme')

router.get('/', medicoController.listar)

router.post('/', validate(medicoScheme.crearMedico), medicoController.crear)

router.get('/:idMedico', medicoController.listarInfo)

module.exports = router