require('dotenv').config()

module.exports = {    
    PORT: process.env.PORT || 5000,// obtiene puerto de archivo .env, si no existe asigna 5000 por defecto
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD
}