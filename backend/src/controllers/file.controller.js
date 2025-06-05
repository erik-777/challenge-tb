import CsvFileParserService from '../services/csvFileParser.service.js';
import FileService from "../services/file.service.js";

// const CsvFileParserService = require('../services/csvFileParser.service');
// const FileService = require('../services/file.service');

class FileController {
    async getFilesData(req, res, next) {
        try {
            const { fileName } = req.query;
            const results = [];
            let files = [];

            if (fileName && typeof fileName === 'string' && fileName.trim() !== '') {
                const result = await this.processFile(fileName.trim());

                if (result && typeof result.toJSON === 'function') {
                    return res.json([result.toJSON()]);
                } else {
                    console.warn(`File ${fileName} could not be processed or has invalid format`);
                    return res.json([]);
                }
            }

            try {

                const response = await FileService.getFilesList();
                if (Array.isArray(response)) {
                    files = response;
                } else if (response && typeof response === 'object' && Array.isArray(response.files)) {
                    files = response.files;
                } else if (response && typeof response === 'object' && response.data && Array.isArray(response.data.files)) {
                    files = response.data.files;
                } else {

                    return res.json([]);
                }
            } catch (error) {
                //console.error('Error getting files list:', error.message);
                return res.json([]);
            }

            for (const file of files) {
                const fileData = await this.processFile(file);
                if (fileData) {
                    results.push(fileData.toJSON());
                }
            }

            res.json(results);
        } catch (error) {
            //console.log(error)
            next(error)
        }
    }
    async getFilesList(req, res, next) {
        try {
            const files = await FileService.getFilesList()
            res.json({ files: Array.isArray(files) ? files : [] })
        } catch (error) {
            console.error("Error fetching files list:", error.message)
            res.json({ files: [] });
            next(error);
        }
    }


    async processFile(fileName) {

        try {
            const content = await FileService.getFileContent(fileName)

            if (!content) {
                console.log(`File ${fileName} is empty or could not be downloaded`);
                return null;
            }

            const parsedFile = CsvFileParserService.parseContent(content, fileName)
            if (!parsedFile) {
                console.log(`File ${fileName} has no valid lines or could not be parsed`);
                return null;
            }

            return parsedFile;
        } catch (error) {
            console.error(`Error processing file ${fileName}:`, error.message);
            return null;
        }


    }
}

export default new FileController();