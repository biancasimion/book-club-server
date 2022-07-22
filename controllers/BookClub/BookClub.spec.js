const mongoose = require('mongoose');
const bookClubController = require('./BookClub');
const BookClubModel = require('../../models/BookClub');

const resMock = {
  status: jest.fn().mockReturnThis(), send: jest.fn(),
};

const mockBookClubs = [
  {
    _id: '62c34c3bde9fe61553d8e5d0',
    name: 'Tesy Book Club',
    description: 'A book club for test',
    category: [
      'horror',
    ],
    isPrivate: false,
    isAdultOnly: false,
    date: '2022-07-04T20:22:15.855Z',
    __v: 0,
  },
  {
    _id: '62c34b6d9331609c06635900',
    name: 'Autobiography Book Club',
    description: 'A book club for autobiographies',
    category: [
      'Autobiographies',
    ],
    isPrivate: false,
    isAdultOnly: false,
    date: '2022-07-04T20:12:32.923Z',
    __v: 0,
  },
  {
    _id: '62c34be19331609c06635902',
    name: 'Horror Book Club',
    description: 'A book club for horro',
    category: [
      'horror',
    ],
    isPrivate: false,
    isAdultOnly: false,
    date: '2022-07-04T20:12:32.923Z',
    __v: 0,
  },
  {
    date: '2022-07-04T20:22:15.855Z',
    _id: '62bb66cb155dfee008961071',
    name: 'Fantasy Book Club',
    description: 'A book club for fantasy lovers',
    category: [
      'fantasy',
    ],
    isPrivate: false,
    isAdultOnly: false,
    __v: 0,
  },
  {
    date: '2022-07-04T20:22:15.855Z',
    _id: '62c342f7cfd03543a1d88c8d',
    name: 'Test Book Club',
    description: 'Test book club description',
    category: [
      'romance',
      'shortStories',
    ],
    isPrivate: true,
    isAdultOnly: true,
    __v: 0,
  },
  {
    date: '2022-07-04T20:22:15.855Z',
    _id: '62c3443213efd413188fa88e',
    name: 'Mystery book club ',
    description: 'A book club for mystery and suspense books',
    category: [
      'mistery',
      'suspenseAndThrillers',
    ],
    isPrivate: false,
    isAdultOnly: false,
    __v: 0,
  },
  {
    date: '2022-07-04T20:22:15.855Z',
    _id: '62c34a8813efd413188fa890',
    name: 'Classics',
    description: 'Classics books',
    category: [
      'classics',
    ],
    isPrivate: false,
    isAdultOnly: false,
    __v: 0,
  },
];

const mockObjectId = new mongoose.Types.ObjectId();

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

    describe('when there is an error', () => {
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

  describe('GET getAllBookClubs', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      BookClubModel.find = jest.fn().mockResolvedValue(mockBookClubs);
    });
    describe('when successful', () => {
      it('should return an array with all the book clubs', async () => {
        const reqMock = {};

        await bookClubController.getAllBookClubs(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith(mockBookClubs);
      });
    });

    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        const reqMock = {};

        BookClubModel.find = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));

        await bookClubController.getAllBookClubs(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });

  describe('GET getBookClubById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      BookClubModel.findById = jest.fn().mockResolvedValue(mockBookClubs[0]);
    });
    describe('when successful', () => {
      it('should return a book club', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
        };

        await bookClubController.getBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith(mockBookClubs[0]);
      });
    });

    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
        };

        BookClubModel.findById = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));

        await bookClubController.getBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });

  describe('PUT editBookClubById', () => {
    const mockedEditedBookClub = {
      _id: '62c34a8813efd413188fa890',
      name: 'Hi',
      description: 'Classics books',
      category: [
        'classics',
      ],
      isPrivate: false,
      isAdultOnly: false,
      __v: 0,
      date: '2022-07-05T09:19:26.989Z',
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      BookClubModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockedEditedBookClub);
    });

    describe('when successful', () => {
      it('should return the edited book club', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
          body: {
            data: {
              name: 'hi',
            },
          },
        };

        await bookClubController.editBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith(mockedEditedBookClub);
      });
    });

    describe('when no data is sent to be edited', () => {
      it('should return a 404 and an error message', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
          body: {},
        };
        BookClubModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Error')));

        await bookClubController.editBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(404);
        expect(resMock.send).toHaveBeenCalledWith('There is no book club to edit');
      });
    });

    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
          body: {
            data: {
              name: 'hi',
            },
          },
        };

        BookClubModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));

        await bookClubController.editBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });

  describe('PATCH joinBookClubById', () => {
    const mockedEditedBookClub = {
      _id: '62c34a8813efd413188fa890',
      name: 'Hi',
      description: 'Classics books',
      category: [
        'classics',
      ],
      isPrivate: false,
      isAdultOnly: false,
      __v: 0,
      date: '2022-07-05T09:19:26.989Z',
      memebers: 1,
    };

    const bookClubData = {
      _id: '62c34a8813efd413188fa890',
      name: 'Hi',
      description: 'Classics books',
      category: [
        'classics',
      ],
      isPrivate: false,
      isAdultOnly: false,
      __v: 0,
      date: '2022-07-05T09:19:26.989Z',
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      BookClubModel.findById = jest.fn().mockResolvedValue(bookClubData);
      BookClubModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockedEditedBookClub);
    });

    describe('when successful', () => {
      it('should return the edited book club containing the members', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
        };

        await bookClubController.joinBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledWith(mockedEditedBookClub);
      });
    });

    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        const reqMock = {
          params: {
            id: mockObjectId,
          },
        };

        BookClubModel.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));

        await bookClubController.joinBookClubById(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });
});
