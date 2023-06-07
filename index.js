import express, { request } from "express";
import {router} from "./router/router.js";
import bodyParser from "body-parser";
import cors from "cors";

//axios interceptors 
//   axios.interceptors.request.use (request => {
//     console.log(request);
//     return request;
//   })

//   axios.interceptors.response.use (response => {
//     console.log(response);
//     return response;
//   }) 
// //admin bro setup 
// import AdminBro from 'admin-bro';
// import { buildRouter as AdminBroExpressBuildRouter } from '@admin-bro/express';
// import pkg from '@admin-bro/express';


// const adminBro = new AdminBro({
//   databases: [],
//   rootPath: '/admin',
// });

// const adminRouter = AdminBroExpressBuildRouter(adminBro);
// app.use(adminBro.options.rootPath, adminRouter);


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

//admin bro server 
// app.use(adminBro.options.rootPath, router)
// app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin')) 