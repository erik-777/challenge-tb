import express from 'express'
import cors from 'cors'
import { PORT } from './src/config/constants.js'
import Files from './src/routes/file.router.js'
import errorHandler from './src/middleware/errorHandler.js'
//const express = require('express')
//cors')
//const { PORT } = require('./src/config/constants')
//const fileRouter = require('./src/routes/file.router')
//const errorHandler = require('./src/middleware/errorHandler')


const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/files', Files)

// Verificacion del Servicio
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK', timestamp: new Date().toISOString() })
})

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`API is available at http://localhost:${PORT}/api/files`)
    console.log(`Health check endpoint at http://localhost:${PORT}/health`)
})

export default app;