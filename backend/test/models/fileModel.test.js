// test/models/fileModel.test.js
import { expect } from 'chai';
import FileModel from '../../src/model/file.model.js';

// Línea válida para pruebas
const VALID_LINE = {
  file: 'file1.csv',
  text: 'Some text',
  number: '12345',
  hex: '0123456789abcdef0123456789abcdef'
};

// Línea con hex inválido
const INVALID_HEX_LINE = {
  ...VALID_LINE,
  hex: 'ZZZ' // no es válido
};

// Línea con campo faltante (file)
const MISSING_FIELD_LINE = {
  text: 'no file',
  number: '100',
  hex: '0123456789abcdef0123456789abcdef'
};

describe('FileModel', () => {
  // Prueba de instancia inicial
  it('debería crear una instancia correctamente', () => {
    const model = new FileModel('test.csv');
    expect(model.file).to.equal('test.csv');
    expect(model.lines).to.be.an('array').that.is.empty;
  });

  // Verifica que se agregue correctamente una línea válida
  it('debería aceptar una línea válida con addLine()', () => {
    const model = new FileModel('test.csv');
    const added = model.addLine(VALID_LINE);
    expect(added).to.be.true;
    expect(model.lines).to.have.lengthOf(1);
  });

  // Rechaza líneas con hex inválido
  it('debería rechazar una línea con hex inválido', () => {
    const model = new FileModel('test.csv');
    const added = model.addLine(INVALID_HEX_LINE);
    expect(added).to.be.false;
    expect(model.lines).to.have.lengthOf(0);
  });

  // Rechaza líneas con campos faltantes
  it('debería rechazar una línea con campos faltantes', () => {
    const model = new FileModel('test.csv');
    const added = model.addLine(MISSING_FIELD_LINE);
    expect(added).to.be.false;
    expect(model.lines).to.have.lengthOf(0);
  });

  // Verifica el estado de hasValidLines
  it('should correctly report hasValidLines()', () => {
    const model = new FileModel('test.csv');
    expect(model.hasValidLines()).to.be.false;
    model.addLine(VALID_LINE);
    expect(model.hasValidLines()).to.be.true;
  });

  // Verifica el resultado de toJSON()
  it('toJSON() debe retornar el objeto esperado', () => {
    const model = new FileModel('test.csv');
    model.addLine(VALID_LINE);
    const json = model.toJSON();
    expect(json).to.deep.equal({
      file: 'test.csv',
      lines: [
        {
          text: 'Some text',
          number: 12345,
          hex: '0123456789abcdef0123456789abcdef'
        }
      ]
    });
  });
});