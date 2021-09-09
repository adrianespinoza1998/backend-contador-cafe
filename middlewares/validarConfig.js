const {request, response} = require("express");
const {Configuraciones} = require("../models");


const configExiste = async(req = request, res = response, next)=>{

    const {id} = req.params;

    const config = Configuraciones.findById(id);

    if(!config){
        return res.status(400).json({
            msg: 'Configuración no existe'
        })
    }

    next();
}

module.exports = {
    configExiste
}