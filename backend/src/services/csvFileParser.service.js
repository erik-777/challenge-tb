import FileModel from '../model/file.model.js';
import { REQUIRED_FIELDS_COUNT } from '../config/constants.js';


export default class CsvFileParserService {

    parseContent(content, fileName) {
        if (!content || typeof content !== 'string') {

            return null;
        }

        const lines = content.split('\n').filter(line => line.trim())

        if (lines.length <= 1) {
            return null
        }

        const fileModel = new FileModel(fileName)
        let validLine = 0;

        let invalidLine = 0;

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseLine(lines[i])

            if (values.length === REQUIRED_FIELDS_COUNT) {
                const added = fileModel.addLine({
                    file: values[0],
                    text: values[1],
                    number: values[2],
                    hex: values[3]
                })

                if (added) {
                    validLine++;
                } else {
                    invalidLine++;
                }
            } else {
                invalidLine++;
            }
        }
        return fileModel.hasValidLines() ? fileModel : null
    }

    parseLine(line) {
        return line.split(',').map(value => value.trim())
    }

}

//module.exports = new CsvFileParserService()
