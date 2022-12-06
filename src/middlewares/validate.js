module.exports = (scheme) => {

    return (req, res, next) => {
        let result = scheme.validate(req.body)//valida datos de entrada con el equema

        if (result.error){ //si hay error
            next(result.error)//enviar error al controlador
        } else {//si no hay error
            next()//continua a la ejecucion del controlador
        }
    }
}