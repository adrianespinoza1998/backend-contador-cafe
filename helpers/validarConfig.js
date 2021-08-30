const {request, response} = require("express");
const {Configuraciones} = require("../models");


const configExiste = async(id = '')=>{

    const config = Configuraciones.findById(id);

    if(!config){
        throw new Error('Configuración no existe');
    }
}

module.exports = {
    configExiste
}