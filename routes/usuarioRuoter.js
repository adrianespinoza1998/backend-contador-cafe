const { Router } = require('express');

const {signin, listarUsuarios, editarUsuario, eliminarUsuario, getUsuario} = require('../controllers/usuarioController');
const {check} = require("express-validator");
const {emailExiste, validarRol, existeId, usuarioEliminado} = require("../helpers/db-validators");
const {validarCampos} = require("../middlewares/validar-campos");
const {esAdminRole} = require("../middlewares/validar-roles");
const {validarJwt} = require("../middlewares/validar-jwt");

const router = Router();

router.get('/',[
    validarJwt,
    esAdminRole,
    validarCampos
], listarUsuarios);

router.get('/:id',[
    validarJwt,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], getUsuario);

router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contrasena','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    check('correo').custom(emailExiste),
    validarCampos
],signin);

router.put('/:id',[
    validarJwt,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(validarRol),
    validarCampos
],editarUsuario);

router.delete('/:id',[
    validarJwt,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    check('id').custom(usuarioEliminado),
    validarCampos
],eliminarUsuario);

module.exports = router;