const {request, response} = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response)=>{
    const [num_usuarios, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
    ]);

    res.json({
        num_usuarios,
        usuarios
    });
}

const signin = async(req = request, res = response)=>{
    const {nombre, correo, contrasena} = req.body;

    const data = {
        nombre,
        correo,
        rol: process.env.USER_ROL
    }

    const salt = bcrypt.genSaltSync();

    data.contrasena = bcrypt.hashSync(contrasena, salt);

    const usuario = await new Usuario(data);
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const editarUsuario = async(req = request, res = response)=>{

    const {id} = req.params;
    const {nombre, correo, contrasena, img} = req.body;

    const data = {
        nombre,
        correo,
        contrasena
    }

    if(img){
        data.img = img
    }

    const usuario = await Usuario.findByIdAndUpdate(id, data,{new:true});

    res.status(200).json({
        usuario
    });
}

const eliminarUsuario = async (req = request, res = response)=> {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});

    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    signin,
    editarUsuario,
    eliminarUsuario
}