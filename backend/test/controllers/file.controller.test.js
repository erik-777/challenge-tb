

// Importa las herramientas necesarias para las pruebas
import { expect } from 'chai';
import sinon from 'sinon';
import * as FileServiceModule from '../../src/services/file.service.js';
import { getFilesData, getFilesList } from '../../src/controllers/file.controller.js';

// Simula un objeto de respuesta similar al que proporciona Express
const mockResponse = () => {
    const res = {};
    res.json = sinon.stub().returns(res); // Stub para capturar las respuestas JSON
    return res;
};

describe('FileController', () => {
    let req, res, next;

    // Se ejecuta antes de cada prueba para inicializar los mocks
    beforeEach(() => {
        req = { query: {} };             // Simula un objeto request vacío
        res = mockResponse();            // Simula el response
        next = sinon.stub();             // Stub para la función next()
    });

    // Grupo de pruebas para getFilesList
    describe('getFilesList', () => {
        it('debería retornar lista vacía si ocurre un error', async () => {
            await getFilesList(req, res, next); // Ejecuta la función a probar
            expect(res.json.calledOnce).to.be.true; // Verifica que res.json se haya llamado una vez
            expect(res.json.firstCall.args[0])      // Verifica que el contenido retornado...
                .to.have.property('files')            // ...tenga la propiedad 'files'
                .that.is.an('array');                 // ...y sea un arreglo
        });
    });

    // Grupo de pruebas para getFilesData
    describe('getFilesData', () => {
        let getFilesListStub;

        beforeEach(() => {
            req = { query: { fileName: '   ' } };
            res = mockResponse();
            next = sinon.stub();

            // Stub de getFilesList para evitar que devuelva datos reales
            getFilesListStub = sinon.stub(FileServiceModule.default.prototype, 'getFilesList').resolves([]);
        });

        afterEach(() => {
            sinon.restore(); // Limpia todos los stubs
        });

        it('debería retornar un arreglo vacío si no hay archivo válido', async () => {
            await getFilesData(req, res, next);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.be.an('array').that.is.empty;
        });
    })
});
