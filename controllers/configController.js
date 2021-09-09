const {request, response} = require("express");
const {Configuraciones} = require("../models");


const editarConfig = async(req = request, res = response)=>{
    const {id} = req.params;
    const {estricto, oscuro} = req.body;

    const data = {
        estricto,
        oscuro
    }

    const config = await Configuraciones.findByIdAndUpdate(id, data,{new:true});

    res.status(200).json({
        config
    });
}

module.exports = {
    editarConfig
}