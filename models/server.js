const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {dbConnection} = require("../database/config");
const usuarioRouter = require('../routes/usuarioRuoter');
const authRouter = require('../routes/authRouter');
const configRouter = require('../routes/configRoutes');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            config: '/api/config'
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
        this.app.use(this.path.usuarios, usuarioRouter);
        this.app.use(this.path.auth, authRouter);
        this.app.use(this.path.config, configRouter);
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