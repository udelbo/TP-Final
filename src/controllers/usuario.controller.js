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
    },
    subirArchivo: async (req, res, next) => {
        try{
            //verifica que el usuario existe
            const user = await models.usuario.findOne({
                where: {
                    id: req.body.usuarioId
                }
            })
            if(!user) return next(errors.UsuarioInexistente)

            const ar = await models.archivo_usuario.findOne({
                where: {
                    usuarioId: req.body.usuarioId,
                    nombre: req.body.nombre
                }
            })
            if(!ar) {
                const archivo = await models.archivo_usuario.create({
                    nombre: req.body.nombre,
                    file: req.file ? req.file.filename : null,
                    original_name: req.file ? req.file.originalname : null,
                    usuarioId: req.body.usuarioId
                })
            }

            res.json({
                success: true,
                data: {
                    message: 'El archivo se fue cargado correctamente'
                }
            })
        }catch(err){
            return next(err);
        }
    },
    descargarArchivo: async (req, res, next) => {
        try{
            ///verifica que el usuario existe
            const user = await models.usuario.findOne({
                where: {
                    id: req.body.usuarioId
                }
            })
            if(!user) return next(errors.UsuarioInexistente)

            //verifica que el archivo existe
            const archivo = await models.archivo_usuario.findOne({
                where: {
                    usuarioId: req.body.usuarioId,
                    nombre: req.body.nombre
                }
            })
            
            if(!archivo) return next(errors.ArchivoInexistente)

            res.download('uploads/archivos-usuarios/' + archivo.file, archivo.original_name)//descarga achivo
            
        }catch(err){
            return next(err);
        }
    }
}