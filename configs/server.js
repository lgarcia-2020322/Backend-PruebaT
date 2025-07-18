'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import { dbConnection } from './db.js'
import postRoutes from '../src/posts/post.routes.js'


class ExpressServer {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.postPath = '/blog/v2'

        this.middlewares() //faltaba esto
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(apiLimiter);
    }


    routes(){
        this.app.use(this.postPath, postRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default ExpressServer;
