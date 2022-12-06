//controlador de usuario

const models = require('../database/models/index')
const errors = require('../const/errors')

module.exports = {
    
    listar: async (req, res) => {
        const users = await models.usuario.findAll()

        res.json({
            success: true,
            data: {
                usuarios: users
            }
        })
    },
    listarInfo: async (req, res, next) => {
        try {
            const user = await models.usuario.findOne({
                where: {
                    id: req.params.idUsuario
                }
            })
            if(!user) return next(errors.UsuarioInexistente)

            res.json({
                success: true,
                data: {
                    usuarios: user
                }
            })
        }catch(err){
            return next(err)
        }
    },
    crear: async (req, res) => {
        const user = await models.usuario.create(req.body)

        res.json({
            success: true,
            data: {
                id: user.id
            }
        })
    }
}