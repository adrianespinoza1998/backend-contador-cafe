const {Schema, model} = require('mongoose');

const configuracionesSchema = Schema({
   estricto:{
       type: Boolean,
       required: true,
       default: false
   },
    oscuro:{
        type: Boolean,
        required: true,
        default: false
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado:{
       type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('Configuraciones', configuracionesSchema);