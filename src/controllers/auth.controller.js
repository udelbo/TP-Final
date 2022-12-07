//controlador de autenticacion

const models = require('../database/models/index')
const errors = require('../const/errors')

const bcrypt = require('bcryptjs')
const signJWT = require('../middlewares/signJWT')

module.exports = {
    
    login: async (req, res, next) => {
        try {
            const user = await models.usuario.findOne({
                where: {
                    email: req.body.email
                }
            })

            var contraseniaCoincide = false

            if (user){
                contraseniaCoincide = bcrypt.compareSync(req.body.password, user.password)
            }

            if(!user || !contraseniaCoincide){
                return next(errors.CredencialesInvalidas)
            }

            res.json({
                success: true,
                data: {
                    token: signJWT(user),
                    id: user.id
                }
            })
        } catch (err) {
            return next(err)
        }
    },
    signin: async (req, res, next) => {
        try{            
            req.body.password = bcrypt.hashSync(req.body.password, 10)

            const user = await models.usuario.create(req.body)

            res.json({
                success: true,
                data: {
                    id: user.id
                }
            })
        }catch(err){
            return next(err)
        }
    }
}