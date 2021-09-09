const {request, response} = require("express");

const esAdminRole = async(req = request, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Validar admin ejecutado sin validar token'
        });
    }

    if(req.usuario.rol != 'ADMIN'){
        return res.status(401).json({
            msg: `${req.usuario.rol} no es administrador`
        });
    }

    next();
}

const esVentasRole = (req = request, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Validar admin ejecutado sin validar token'
        });
    }

    const {nombre, role} = req.usuario;

    if(role !=='VENTAS_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}

const tieneRol = (...roles)=>{
    return (req = request, res = response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Validar admin ejecutado sin validar token'
            });
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`
            });
        }

        console.log(roles);
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol,
    esVentasRole
}