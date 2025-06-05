import { HEX_REGEX } from '../config/constants.js';

class FileModel {
    constructor(fileName, lines = []) {
        this.file = fileName;
        this.lines = lines;
    }
    addLine(lineData) {
        if (this.validateLineData(lineData)) {
            this.lines.push({
                text: lineData.text,
                number: parseInt(lineData.number),
                hex: lineData.hex
            });
            return true;
        }
        return false;
    }

    validateLineData(lineData) {
        if (!lineData.file || !lineData.text || !lineData.number || !lineData.hex) {
            return false;
        }

        // Verificar que number sea un número válido
        if (isNaN(lineData.number) || lineData.number === '') {
            return false;
        }

        // Verificar que hex tenga exactamente 32 caracteres hexadecimales
        if (!HEX_REGEX.test(lineData.hex)) {
            return false;
        }

        return true;
    }

    hasValidLines() {
        return this.lines.length > 0
    }

    toJSON() {
        return {
            file: this.file,
            lines: this.lines
        }
    }
}

export default FileModel;