// router principal

const { Router } = require('express');

const usuarioRoutes = require('./usuario.routes')
const medicoRoutes = require('./medico.routes')
const pacienteRoutes = require('./paciente.routes')
const rutas_init = () => {
    const router = Router();

    router.use("/usuarios", usuarioRoutes)
    router.use("/medicos", medicoRoutes)
    router.use("/pacientes", pacienteRoutes)

    return router

}

module.exports = { rutas_init }