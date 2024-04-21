import express from 'express';
const app = express();

app.get('/', (req, res, next) => {
  res.json({
    result: null,
    message: "Home page data fetched...",
    meta: null
  })
})

export default app;