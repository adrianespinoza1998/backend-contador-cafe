const {request, response} = require("express");
const {Configuraciones} = require("../models");


const editarConfig = async(req = request, res = response)=>{
    const {id} = req.params;
    const {estricto, oscuro} = req.body;

    const data = {
        estricto: (estricto === 'true') ? true : false,
        oscuro: (oscuro === 'true') ? true : false
    }

    const config = await Configuraciones.findByIdAndUpdate(id, data);

    res.status(200).json({
        config
    });
}

module.exports = {
    editarConfig
}