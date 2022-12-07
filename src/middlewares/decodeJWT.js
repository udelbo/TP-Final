const jwt = require("jsonwebtoken")
const errors = require('../const/errors')
const modelos = require('../database/models/index')
const moment = require('moment')
const globalConstants = require('../const/globalConstants')

module.exports = async function(req, res, next) {
    if(req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
        try{
            //verifica token y decodifica con clave secreta para obtener los datos del usuario que se logeó y guarda en variable dataToken
            let dataToken = jwt.verify(req.header('Authorization').split(' ')[1], globalConstants.JWT_SECRET)

            if(dataToken.exp <= moment().unix())
                return next(errors.SesionExpirada)// si el token expiro mostar error

            res.locals.token = dataToken

            const usuario = await modelos.usuarios.findOne({
                where: {
                    id: dataToken.id
                }
            })
            if(!usuario) return next(errors.UsuarioNoAutorizado)

            res.locals.usuario = usuario // guarda el usuario en el locals para usarlo en las rutas que necesite el usuario

            next()
        }catch(err){
            return next(errors.SesionExpirada2)
        }
    }else{
        return next(errors.UsuarioNoAutorizado)
    }
}