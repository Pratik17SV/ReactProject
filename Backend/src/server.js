import express from 'express'
import dotenv from 'dotenv'

import authRoute from './Routes/auth.route.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT


app.use("/app/auth",authRoute);

app.listen(PORT, () => {
  console.log('Server is running on port '+PORT);
});