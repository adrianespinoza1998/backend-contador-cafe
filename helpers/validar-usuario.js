const {Usuario} = require("../models");

const validarUsuario = async(usuario)=>{
    const buscarUsuario = await Usuario.findById(usuario);

    if(!buscarUsuario){
        throw new Error('No existen cucharadas asociadas al usuario ingresado');
    }
}

module.exports = {
    validarUsuario
}