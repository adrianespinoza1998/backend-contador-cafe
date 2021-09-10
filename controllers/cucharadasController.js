const {request, response} = require("express");
const {Cucharadas} = require("../models");


const getCucharadas = async(req = request, res = response)=>{
    const {id} = req.params;

    const [limite, cucharadas] = await Promise.all([
        Cucharadas.countDocuments({usuario:id, estado:true}),
        Cucharadas.find({usuario:id, estado:true})
    ]);

    res.status(200).json({
        limite,
        cucharadas
    });
}

const crearCucharada = async(req = request, res = response)=>{
    const {porcion} = req.body;

    const data = {
        fecha: Date.now(),
        porcion,
        usuario:req.usuario._id
    }

    const cucharada = await new Cucharadas(data);

    await cucharada.save();

    res.status(201).json({
        cucharada
    });
}

const editarCucharada = async(req = request, res = response)=>{
    const {porcion, fecha} = req.body;
    const {id} = req.params;

    console.log(fecha);

    const data = {
        fecha,
        porcion
    }

    const cucharada = await Cucharadas.findByIdAndUpdate(id,data,{new:true});
    await cucharada.save();

    res.status(200).json({
        cucharada
    });
}

const eliminarCucharada = async(req = request, res = response)=>{
    const {id} = req.params;

    const cucharada = await Cucharadas.findByIdAndUpdate(id,{estado:false},{new:true});
    await cucharada.save();

    res.status(200).json({
        cucharada
    });
}

module.exports = {
    getCucharadas,
    crearCucharada,
    editarCucharada,
    eliminarCucharada
}