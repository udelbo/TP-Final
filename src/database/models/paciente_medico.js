'use strict'; //deshabilita variables no definidas

module.exports = (sequelize, DataTypes) => {

    let Paciente_medico = sequelize.define('paciente_medico', {//definicion de modelo de tabla paciente_medico
        id: {
            type: DataTypes.BIGINT, //tipo de dato
            autoIncrement: true, // auto incremental
            primaryKey: true, // clave primaria
            allowNull: false, //no permite nulos
        },
        createdAt: {
            type: DataTypes.DATE, //tipo de dato
            field: 'created_at', //nombre de columna
            defaultValue: DataTypes.NOW, // fecha actual por defecto
            allowNull: false, //no permite nulos
        },
        updatedAt: {
            type: DataTypes.DATE, //tipo de dato
            field: 'updated_at', //nombre de columna
            defaultValue: DataTypes.NOW, // fecha actual por defecto
            allowNull: false, //no permite nulos
        },
        deletedAt: {
            type: DataTypes.DATE, //tipo de dato
            field: 'deleted_at', //nombre de columna
        }

    },{
        paranoind: true,// eliminar solo de forma logica, los datos se mantienen fisicamente
        freezeTableName: true//evita que modifique el nombre de la tabla a plural

    })

    Paciente_medico.associate = models => {
        //relaciones entre tablas de base de datos
        Paciente_medico.belongsTo(models.paciente)
        Paciente_medico.belongsTo(models.medico)
    }

    return Paciente_medico

}