const { Router } = require('express');
const {check} = require("express-validator");

const {getCucharadas, crearCucharada, editarCucharada, eliminarCucharada} = require("../controllers/cucharadasController");
const {validarJwt} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarUsuario} = require("../helpers/validar-usuario");
const {validarCucharada} = require("../helpers/validar-cucharada");

const router = Router();

router.get('/:id',[
    validarJwt,
    check('id','No es un id valido').isMongoId(),
    validarCampos
], getCucharadas);

router.post('/',[
    validarJwt,
    check('usuario','No se ha enviado el usuario').not().isEmpty(),
    check('usuario', 'No es un id valido').isMongoId(),
    check('usuario').custom(validarUsuario),
    check('porcion','No se ha enviado la porcion').not().isEmpty(),
    check('porcion','No es un float').isFloat(),
    //check('fecha','No es un date').isDate(),
    validarCampos
], crearCucharada);

router.put('/:id',[
    validarJwt,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(validarCucharada),
    validarCampos
], editarCucharada);

router.delete('/:id',[
    validarJwt,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(validarCucharada),
    validarCampos
], eliminarCucharada);

module.exports = router;