const {Router} = require('express');

const {login, googleSignIn} = require("../controllers/authController");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.post('/',[
    check('correo','El correo es obligatorio').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;