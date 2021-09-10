const {Cucharadas} = require("../models");

const validarCucharada = async(id)=>{
    const cucharada = await Cucharadas.findById(id);

    if(!cucharada){
        throw new Error(`No existe la cucharada asociada al id ${id}`);
    }
}

module.exports = {
    validarCucharada
}