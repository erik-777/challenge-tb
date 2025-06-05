
import { expect } from 'chai';
import CsvFileParserService from '../../src/services/csvFileParser.service.js';
import FileModel from '../../src/model/file.model.js';

// Stub necesario para constantes
const VALID_CONTENT = `file,text,number,hex\nfile1,Hello,1234,abcdefabcdefabcdefabcdefabcdefab\nfile1,World,5678,1234567890abcdef1234567890abcdef`;
const INVALID_CONTENT = `file,text,number,hex\nfile1,Hello,abc,nothex\nfile1,NoHex,1234,zzz`; // líneas inválidas

// Forzamos la constante requerida
const REQUIRED_FIELDS_COUNT = 4;

describe('CsvFileParserService', () => {
  let parser;

  beforeEach(() => {
    parser = new CsvFileParserService();
  });

  describe('parseContent', () => {
    it('debería retornar una instancia de FileModel con líneas válidas', () => {
      const result = parser.parseContent(VALID_CONTENT, 'file1.csv');

      expect(result).to.be.an.instanceof(FileModel);
      expect(result.file).to.equal('file1.csv');
      expect(result.lines).to.have.lengthOf(2);
    });

    it('debería retornar null si el contenido es inválido o vacío', () => {
      expect(parser.parseContent('', 'file.csv')).to.be.null;
      expect(parser.parseContent(null, 'file.csv')).to.be.null;
      expect(parser.parseContent('file,text,number,hex\n', 'file.csv')).to.be.null;
    });

    it('debería retornar null si no hay líneas válidas', () => {
      const result = parser.parseContent(INVALID_CONTENT, 'file.csv');
      expect(result).to.be.null;
    });
  });

  describe('parseLine', () => {
    it('debería dividir una línea CSV en campos correctamente', () => {
      const line = 'file1, Hello , 42 , abcdef123456abcdef123456abcdef12';
      const values = parser.parseLine(line);
      expect(values).to.deep.equal(['file1', 'Hello', '42', 'abcdef123456abcdef123456abcdef12']);
    });
  });
});
