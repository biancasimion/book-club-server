const axios = require('axios');
// const MockAdapter = require('axios-mock-adapter');
const booksController = require('./Books');
const bookMock = require('../mocks/books');

jest.mock('axios');

const resMock = {
  status: jest.fn().mockReturnThis(), send: jest.fn(),
};
describe('Books Controller', () => {
  describe('findBookBySearchTerm', () => {
    it('should return a list of books', async () => {
      const reqMock = {
        query: {
          q: 'Test Books',
        },
      };

      const mockData = { data: { items: [bookMock] } };
      axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

      await booksController.findBookBySearchTerm(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.send).toHaveBeenCalledWith(mockData.data);
    });
    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        const errorMessage = 'Network Error';
        const reqMock = {
          query: {
            q: 'Test Books',
          },
        };

        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        await booksController.findBookBySearchTerm(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  });
});
