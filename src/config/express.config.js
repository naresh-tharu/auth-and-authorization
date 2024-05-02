import express from 'express';
import routes from "../routes/index.js";
import { ZodError } from 'zod';
import multer from 'multer';
import jwt from 'jsonwebtoken'
const app = express();
import { } from "./mongodb.config.js"

//body-parser in express
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Routes mount
app.use('/api/v1', routes);

//404 Routes in express
app.use((req, res, next) => {
  next({ code: 404, message: "Resource not found" })
})

//Error Handling Middleware
app.use((error, req, res, next) => {
  let code = error.code || 500;
  let msg = error.message || "Internal Server Error";
  if (error instanceof ZodError) {
    let errBag = {}
    error.errors.map((errObj) => {
      errBag[errObj.path[0]] = errObj.message;
    })
    code = 400
    msg = errBag
  }

  //multer error handling
  if (error instanceof multer.MulterError) {
    code = 400
    msg = error.message
  }
  //jsonwebtoken error handling
  if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError || error instanceof jwt.NotBeforeError) {
    code = 401
    msg = error.message
  }
  res.status(code).json({
    result: null,
    message: msg,
    meta: null
  })
})
export default app;