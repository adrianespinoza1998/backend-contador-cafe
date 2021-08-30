const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasena:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    google:{
        type: Boolean,
        default: false,
        required: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    img:{
        type: String
    }
});

module.exports = model('Usuario', usuarioSchema);