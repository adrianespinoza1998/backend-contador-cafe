const {Schema, model} = require('mongoose');

const rolSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Rol', rolSchema);