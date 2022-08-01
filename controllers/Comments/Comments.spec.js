const CommentsController = require('./Comments');
const BookClubModel = require('../../models/BookClub');
const CommentsModel = require('../../models/Comments');

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
    commentId: '12345',
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
    commentId: '678910',
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
];

describe('Comments Controller', () => {
  describe('POST addComment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      BookClubModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockBookClubs[0]);
    });

    describe('when successful', () => {
      it('should return the comment data and the book club data', async () => {
        CommentsModel.find = jest.fn().mockResolvedValue([]);

        jest.spyOn(CommentsModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            bookClubId: '12345',
            comment: {
              userName: 'User12',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
              hasBeenEdited: false,
              date: '2022-07-25T10:15:32.367Z',
            },
          },

        };

        await CommentsController.addComment(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalled();
      });
    });

    describe('when bookClubId is missing', () => {
      it('should return a 400 and an error message', async () => {
        CommentsModel.find = jest.fn().mockResolvedValue([]);

        jest.spyOn(CommentsModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            comment: {
              userName: 'User12',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
              hasBeenEdited: false,
              date: '2022-07-25T10:15:32.367Z',
            },
          },

        };

        await CommentsController.addComment(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({ error: '"bookClubId" is required' });
      });
    });

    describe('when comment is missing', () => {
      it('should return a 400 and an error message', async () => {
        CommentsModel.find = jest.fn().mockResolvedValue([]);

        jest.spyOn(CommentsModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.resolve());

        const reqMock = {
          body: {
            bookClubId: '12345',
          },
        };

        await CommentsController.addComment(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledWith({ error: '"comments[0]" must not be a sparse array item' });
      });
    });

    describe('when there is an error', () => {
      it('should return a 500 and an error message', async () => {
        CommentsModel.find = jest.fn().mockResolvedValue([]);

        jest.spyOn(CommentsModel.prototype, 'save')
          .mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));

        const reqMock = {
          body: {
            bookClubId: '12345',
            comment: {
              userName: 'User12',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
              hasBeenEdited: false,
              date: '2022-07-25T10:15:32.367Z',
            },
          },
        };

        await CommentsController.addComment(reqMock, resMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
  });
});
