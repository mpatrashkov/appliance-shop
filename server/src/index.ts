import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import helmet = require("helmet")
import * as cors from "cors"
require("dotenv").config()
import { port } from "./config"
import routes from "./routes"

createConnection()
    .then(async connection => {
        // create express app
        const app = express()
        app.use(cors())
        app.use(helmet())
        app.use(bodyParser.json())

        app.use(routes)

        // setup express app here
        // ...

        // start express server
        app.listen(port)

        console.log(
            `Express server has started on port ${port}. Open http://localhost:${port}/users to see results`
        )
    })
    .catch(error => console.log(error))
