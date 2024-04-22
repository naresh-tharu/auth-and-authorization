import express from 'express';
import routes from "../routes/index.js";
import { ZodError } from 'zod';
const app = express();

//body-parser in express
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', routes);


//404 Routes in express
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Resource not found"
  })
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
  res.status(code).json({
    result: null,
    message: msg,
    meta: null
  })
})
export default app;