const {Router} = require('express');
const {validarJwt} = require("../middlewares/validar-jwt");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {editarConfig} = require("../controllers/configController");
const {configExiste} = require("../helpers/validarConfig");

const router = Router();

router.put('/:id',[
    validarJwt,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(configExiste),
    validarCampos
],editarConfig);

module.exports = router;