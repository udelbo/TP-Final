const jwt = require("jsonwebtoken")
const globalConstants = require('../const/globalConstants')

module.exports = function(usuario) {
    if(usuario){

        const token = jwt.sign({
            id: usuario.id,
        },
            globalConstants.JWT_SECRET,
            {
                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)//1 hora
            }
        )
        return token
    }else{
        return null
    }
}