const {request, response} = require("express");
const {Usuario} = require("../models");
const bcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/generarJWT");
const {googleVerify} = require("../helpers/google-verify");

const login = async(req = request, res = response)=>{

    const {correo, contrasena} = req.body;

    const usuario = await Usuario.findOne({correo, estado:true});

    if(!usuario){
        return res.status(400).json({
            msg : `Correo y/o contraseña incorrecto - correo`
        });
    }

    const validarPassword = bcrypt.compareSync(contrasena, usuario.contrasena);

    if(!validarPassword){
        return res.status(400).json({
            msg: 'Correo y/o contraseña incorrecto - password'
        });
    }

    const token = await generarJWT(usuario.id)

    res.status(200).json({
        usuario,
        token
    });
}

const googleSignIn = async(req = request, res = response)=>{

    try{
        const {id_token} = req.body;

        const {correo, img, nombre} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                contrasena: 'nopuedeser',
                img,
                google: true,
                rol: process.env.USER_ROL
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'El usuario esta bloqueado, hable con el administrador'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    }catch (error) {
        res.status(400).json({
            msg: 'Token de Google no valido',
            error
        });
    }
}

module.exports = {
    login,
    googleSignIn
}