const errors = require('../const/errors');

module.exports = function(err, req, res, next) {

    let response = {
        success: false,
        error: {
            code: err.code || 500, // si no hay codigo asigna el generico error 500
            message: err.message || 'Internal server error' //si no hay mensaje de error se asigna el error generico
        }
    }

    if (err.isJoi) {
        let validationErrorType = err.details[0].type
        let errorKey = 'validationError'

        if(validationErrorType === 'any.required') {
            errorKey = 'FaltanCampos'
        }
        
        response.error.code = errors[errorKey].code
        response.error.message = errors[errorKey].message
    }

    if(err.message === 'Not Found') {
        response.error.code = 404
        response.error.message = 'Not Found'

    }

    /*
    * * 
    * Sequelize validation error (from the model) */ 
    if (err.name === 'SequelizeValidationError') { 
        let validationError = err.errors[0]
        response.error.code = errors['ValidationError'].code
        response.error.message = validationError.message 
    } 
    /** 
    * * CORS not allowed error */ 
    if (err.message === 'Not allowed by CORS'){
        response.error.code = 403 
    } 
    /** 
    * * Sequelize error produced when a value is out of the range of the defined type */
    if (err.name === 'SequelizeDatabaseError' && err.message.indexOff('out of range') >= 0) { 
        response.error.code = errors['ValidationError'].code 
        response.error.message = errors['ValidationError'].message 
    }
    /**
     * Sequelize connection error with the database */
    if (err.name == "SequelizeConnectionError") {
        response.error.code = 500
        response.error.message = 'Internal server error'
    }
    
    res.status(200).json(response)
}
