//controlador de paciente

const models = require('../database/models/index')
const errors = require('../const/errors')

module.exports = {
    
    listar: async (req, res) => {
        const patients = await models.paciente.findAll({
            /* include: [{
                model: models.medico
            }]
            , */
            include: [{
                model: models.paciente_medico,
                include: [{
                    model: models.medico,
                }]
            }]
        })

        res.json({
            success: true,
            data: {
                pacientes: patients
            }
        })
    },
    listarInfo: async (req, res, next) => {
        try {
            const patient = await models.paciente.findOne({
                where: {
                    id: req.params.idPaciente
                },
                include: [{
                    model: models.paciente_medico,
                    include: [{
                        model: models.medico,
                    }]
                }]
                /* include: [{
                    model: models.medico,
                    attributes: ["apellido", "nombre", "especialidad"]
                    //attributes: {exclude: ["id"]}
                }] */
            })
            if(!patient) return next(errors.PacienteInexistente)

            res.json({
                success: true,
                data: {
                    paciente: patient
                }
            })
        }catch(err){
            return next(err)
        }
    },
    crear: async (req, res, next) => {

        //chequeamos si existe el medico
        const medic = await models.medico.findOne({
            where: {
                id: req.body.medicoId
            }
        })
        if(!medic) return next(errors.MedicoInexistente)

        //creamos el paciente
        const patient = await models.paciente.create(req.body)

        const relacion_intermedia = await models.paciente_medico.create({
            medicoId: req.body.medicoId,
            pacienteId: patient.id
        })

        res.json({
            success: true,
            data: {
                id: patient.id
            }
        })
    }
}