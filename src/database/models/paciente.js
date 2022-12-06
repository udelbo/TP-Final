'use strict'; //deshabilita variables no definidas

module.exports = (sequelize, DataTypes) => {

    let Paciente = sequelize.define('paciente', {//definicion de modelo de tabla paciente
        id: {
            type: DataTypes.BIGINT, //tipo de dato
            autoIncrement: true, // auto incremental
            primaryKey: true, // clave primaria
            allowNull: false, //no permite nulos
        },
        nombre: {
            type: DataTypes.STRING, //tipo de dato
            allowNull: false, //no permite nulos
        },
        apellido: {
            type: DataTypes.STRING, //tipo de dato
            allowNull: false, //no permite nulos
        },
        email: {
            type: DataTypes.STRING, //tipo de dato
        },
        edad: {
            type: DataTypes.INTEGER, //tipo de dato
        },
        obra_social: {
            type: DataTypes.STRING, //tipo de dato
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

    Paciente.associate = models => {
        //relaciones entre tablas de base de datos
        Paciente.hasMany(models.paciente_medico)
    }

    return Paciente

}