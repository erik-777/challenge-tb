import express from 'express'
import fileController from '../controllers/file.controller.js'
//const express = require('express')

const Files = express.Router()
//const fileController = require('../controllers/file.controller')

// Bind controller methods to maintain 'this' context
Files.get('/data', (req, res, next) => fileController.getFilesData(req, res, next))
Files.get('/list', (req, res, next) => fileController.getFilesList(req, res, next))

export default Files;