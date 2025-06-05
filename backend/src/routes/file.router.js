import express from 'express'
import { getFilesData, getFilesList } from '../controllers/file.controller.js'


const Files = express.Router()

Files.get('/data', getFilesData)
Files.get('/list', getFilesList)

export default Files;