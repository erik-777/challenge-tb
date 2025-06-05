
import { expect } from 'chai';
import sinon from 'sinon';
import FileService from '../../src/services/file.service.js';

describe('FileService', () => {
  let fileService;
  let axiosStub;

  beforeEach(() => {
    fileService = new FileService();
    // Stub de la función GET del cliente axios
    axiosStub = sinon.stub(fileService.client, 'get');
  });

  afterEach(() => {
    sinon.restore(); // Restaurar todos los stubs al estado original
  });

  describe('getFilesList', () => {
    it('debería retornar la lista de archivos desde la API', async () => {
      const mockFiles = ['file1.csv', 'file2.csv'];
      // Simula respuesta exitosa de la API
      axiosStub.withArgs('/files').resolves({ data: { files: mockFiles } });

      const result = await fileService.getFilesList();
      expect(result).to.deep.equal(mockFiles);
    });

    it('debería lanzar un error si falla la petición', async () => {
      // Simula un fallo en la petición
      axiosStub.withArgs('/files').rejects(new Error('Network Error'));

      try {
        await fileService.getFilesList();
      } catch (error) {
        // Verifica que se lanza el error esperado
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error fetching files list');
      }
    });
  });

  describe('getFileContent', () => {
    it('debería retornar el contenido del archivo', async () => {
      const mockData = { lines: ['line1', 'line2'] };
      // Simula respuesta exitosa para un archivo específico
      axiosStub.withArgs('/file/test.csv').resolves({ data: mockData });

      const result = await fileService.getFileContent('test.csv');
      expect(result).to.deep.equal(mockData);
    });

    it('debería retornar null si ocurre un error', async () => {
      // Simula error en la solicitud del archivo
      axiosStub.withArgs('/file/test.csv').rejects(new Error('Request failed'));

      const result = await fileService.getFileContent('test.csv');
      expect(result).to.be.null;
    });
  });
});
