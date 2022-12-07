const express = require('express')

const globalConstants = require('./const/globalConstants')
const routerConfig = require('./routes/index.routes')

const errorHandler = require('./middlewares/error')
let createError = require('http-errors')

const configuracionApi = (app) => {//configurar api
    app.use(express.json()) //para que pueda recibir json
    app.use(express.urlencoded({ extended: true })) //para que pueda recibir formularios

}

const configuracionRouter = (app) =>{
    app.use('/api/', routerConfig.rutas_init())//para acceder a las rutas de la api siempre debera empezar con /api/
    app.use('/', routerConfig.rutas_auth())//para acceder a las rutas

    app.use(function(req, res, next) {
        next(createError(404)) //si no se encuentra la ruta devuelve el error correspondiente, 404
    })

    app.use(errorHandler)
}

const init = () => {
    const app = express(); // crea instancia de express
    configuracionApi(app);// configura api

    configuracionRouter(app)

    app.listen(globalConstants.PORT)
    console.log('Server running on port ' + globalConstants.PORT);

}

init();