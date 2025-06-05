import FileModel from '../model/file.model.js';
import { REQUIRED_FIELDS_COUNT } from '../config/constants.js';
//const FileModel = require('../model/file.model');
//const { CSV_HEADERS, REQUIRED_FIELDS_COUNT } = require('../config/constants');


class CsvFileParserService {

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
                    //console.log(`Invalid line ${i} in ${fileName}: ${lines[i]} (failed validation)`)
                }
            } else {
                invalidLine++;
                //console.log(`Line ${i} in ${fileName} has ${values.length} fields, expected ${REQUIRED_FIELDS_COUNT}: ${lines[i]}`)
            }
        }

        //console.log(`Parsed ${fileName}: ${validLine} valid lines, ${invalidLine} invalid lines`)

        return fileModel.hasValidLines() ? fileModel : null
    }

    parseLine(line) {
        return line.split(',').map(value => value.trim())
    }

}

//module.exports = new CsvFileParserService()
export default CsvFileParserService;