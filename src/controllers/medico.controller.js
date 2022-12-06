//controlador de medico

const models = require('../database/models/index')
const errors = require('../const/errors')

module.exports = {
    
    listar: async (req, res) => {
        const doctors = await models.medico.findAll()

        res.json({
            success: true,
            data: {
                medicos: doctors
            }
        })
    },
    listarInfo: async (req, res, next) => {
        try {
            const doctor = await models.medico.findOne({
                where: {
                    id: req.params.idMedico
                }
            })
            if(!doctor) return next(errors.MedicoInexistente)

            res.json({
                success: true,
                data: {
                    medico: doctor
                }
            })
        }catch(err){
            return next(err)
        }
    },
    crear: async (req, res) => {
        const doctor = await models.medico.create(req.body)

        res.json({
            success: true,
            data: {
                id: doctor.id
            }
        })
    }
}