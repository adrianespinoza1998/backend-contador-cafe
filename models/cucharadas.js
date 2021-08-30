const {Schema, model} = require('mongoose');

const cucharadaSchema = Schema({
    porcion:{
        type: Number,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    }
});

module.exports = model('Cucharada', cucharadaSchema);