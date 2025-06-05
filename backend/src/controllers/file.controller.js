import CsvFileParserService from "../services/csvFileParser.service.js";
import FileService from "../services/file.service.js";

const fileService = new FileService();
const csvFileParserService = new CsvFileParserService();

async function getFilesData(req, res, next) {
    try {

        const { fileName } = req.query;
        const results = [];
        let files = [];

        if (fileName && typeof fileName === 'string' && fileName.trim() !== '') {
            const result = await processFile(fileName.trim());

            return res.json(result && typeof result.toJSON === 'function' ? [result.toJSON()] : []);
        }

        try {
            const response = await fileService.getFilesList();
            if (Array.isArray(response)) files = response;
            else if (response?.files) files = response.files;
            else if (response?.data?.files) files = response.data.files;
            else return res.json([]);
        } catch (error) {
            return res.json([]);
        }

        for (const file of files) {
            const fileData = await processFile(file);
            if (fileData) results.push(fileData.toJSON());
        }

        res.json(results);
    } catch (error) {
        next(error);
    }
}

async function getFilesList(req, res, next) {
    try {
        const files = await fileService.getFilesList().then((response) => {
            if (Array.isArray(response)) return response;
            if (response?.files) return response.files;
            if (response?.data?.files) return response.data.files;
            return [];
        });
        res.json({ files });
    } catch (error) {
        console.error('Error fetching files list:', error.message);
        res.json({ files: [] });
    }
}

async function processFile(fileName) {
    try {
        const content = await fileService.getFileContent(fileName);
        if (!content) return null;

        const parsedFile = csvFileParserService.parseContent(content, fileName);
        return parsedFile || null;
    } catch (error) {
        console.error(`Error processing file ${fileName}:`, error.message);
        return null;
    }
}


export { getFilesData, getFilesList }
