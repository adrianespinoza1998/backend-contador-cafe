const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {dbConnection} = require("../database/config");
const usuarioRouter = require('../routes/usuarioRuoter');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            usuarios: '/api/usuarios'
        }

        this.conectarDB();

        this.middleware();
    }

    middleware(){
        //Directorio público
        this.app.use( express.static('public'));

        //Habilitar CORS
        this.app.use( cors() );

        //Lectura y escritura JSON
        this.app.use( bodyParser.json() );

        this.routes();
    }

    routes() {
        this.app.use(this.path.usuarios,usuarioRouter);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }

    async conectarDB(){
        await dbConnection();
    }
}

module.exports = Server;