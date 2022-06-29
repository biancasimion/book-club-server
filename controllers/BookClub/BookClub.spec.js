const bookClubController = require('./BookClub');
const BookClubModel = require('../../models/BookClub');

const resMock = {
  status: jest.fn().mockReturnThis(), send: jest.fn(),
};

describe('Book Club Controller', () => {
  describe('POST addBookClub', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });
    describe('when successful', () => {
      it('should return the book club data', async () => {
        jest.spyOn(BookClubModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            data: {
              name: 'Test Book Club',
              description: 'A book club for test',
              category: ['test'],
            },
          },
        };

        await bookClubController.addBookClub(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalled();
      });
    });

    describe('when name is missing', () => {
      it('should return a 400 and an error message', async () => {
        jest.spyOn(BookClubModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            data: {
              description: 'A book club for test',
              category: ['test'],
            },
          },
        };

        await bookClubController.addBookClub(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({ error: '"name" is required' });
      });
    });
    describe('when description is missing', () => {
      it('should return a 400 and an error message', async () => {
        jest.spyOn(BookClubModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            data: {
              name: 'test book',
              category: ['test'],
            },
          },
        };

        await bookClubController.addBookClub(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({ error: '"description" is required' });
      });
    });
    describe('when category is missing', () => {
      it('should return a 400 and an error message', async () => {
        jest.spyOn(BookClubModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            data: {
              name: 'test book',
              description: 'A book club for test',

            },
          },
        };

        await bookClubController.addBookClub(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({ error: '"category" is required' });
      });
    });
    describe('when there is an erro', () => {
      it('should return a 500 and an error message', async () => {
        jest.spyOn(BookClubModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));
        const reqMock = {
          body: {
            data: {
              name: 'test book',
              description: 'A book club for test',
              category: ['test'],
            },
          },
        };

        await bookClubController.addBookClub(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });
});
