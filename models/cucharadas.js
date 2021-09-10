const {Schema, model} = require('mongoose');
const {body} = require("express-validator");

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
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('Cucharada', cucharadaSchema);