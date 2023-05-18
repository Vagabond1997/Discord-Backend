import express from "express";
import {router} from "./router/router.js";
import bodyParser from "body-parser";
import cors from "cors";

import { config } from 'dotenv';
config();
const port = process.env.Port || 800;
const app = express();
app.use(cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//db connection 
// import database from './database/mydb.js';
// console.log(router);
app.use('/', router);

app.listen(port, console.log('Port Running on http://localhost:' + port));