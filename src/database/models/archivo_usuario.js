'use strict'; //deshabilita variables no definidas

module.exports = (sequelize, DataTypes) => {

    let ArchivoUsuario = sequelize.define('archivo_usuario', {//definicion de modelo de tabla usuario
        id: {
            type: DataTypes.BIGINT, //tipo de dato
            autoIncrement: true, // auto incremental
            primaryKey: true, // clave primaria
            allowNull: false, //no permite nulos
        },
        nombre: { //nombre para identificar el archivo por si sube varios
            type: DataTypes.STRING, //tipo de dato
            allowNull: true, //no permite nulos
        },
        file: { //nuevo nombre
            type: DataTypes.STRING, //tipo de dato
            allowNull: true, //no permite nulos
        },
        original_name: { // nombre original
            type: DataTypes.STRING, //tipo de dato
            allowNull: true, //no permite nulos
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

    ArchivoUsuario.associate = models => {
        //relaciones entre tablas de base de datos
        ArchivoUsuario.belongsTo = models.usuario//un archivo pertenece a un usuario
    }

    return ArchivoUsuario

}