const {Rol, Usuario} = require('../models');

const validarRol = async(rol='')=>{
    const existeRol = await Rol.findById(rol);

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

const emailExiste = async(correo)=>{
    const verificarCorreo = await Usuario.findOne({correo});

    if(verificarCorreo){
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`);
    }
}

const existeId = async(id)=>{
    const verificarId = await Usuario.findById(id);

    if(!verificarId){
        throw new Error(`El id ${id} no esta registrado en la BD`);
    }
}

const usuarioEliminado = async(id)=>{
    const usuario = await Usuario.findById(id);

    if(!usuario.estado){
        throw new Error('La cuenta se encuentra bloqueada, por favor contacte con el administrador');
    }
}

module.exports = {
    validarRol,
    emailExiste,
    existeId,
    usuarioEliminado
}