const {request, response} = require('express');
const bcrypt = require('bcryptjs');

const {Configuraciones, Usuario} = require('../models');

const listarUsuarios = async(req = request, res = response)=>{
    const [num_usuarios, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
    ]);

    res.json({
        num_usuarios,
        usuarios
    });
}

const getUsuario = async (req = request, res = response)=>{
    const {id} = req.params;

    const usuario = Usuario.findById(id);

    res.status(200).json({
        usuario
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

    const dataConfig = {
        usuario: usuario.id
    }

    const configuraciones = await new Configuraciones(dataConfig);
    await configuraciones.save();

    res.status(201).json({
        usuario,
        configuraciones
    });
}

const editarUsuario = async(req = request, res = response)=>{

    const {id} = req.params;
    const {nombre, correo, contrasena, img} = req.body;

    const data = {
        nombre,
        correo
    }

    const salt = bcrypt.genSaltSync();
    data.contrasena = bcrypt.hashSync(contrasena, salt);

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

    const config = await Configuraciones.findByIdAndUpdate(usuario.configuraciones,
        {estado:false}, {new:true});

    res.status(200).json({
        usuario,
        config
    });
}

module.exports = {
    getUsuario,
    signin,
    editarUsuario,
    eliminarUsuario,
    listarUsuarios
}