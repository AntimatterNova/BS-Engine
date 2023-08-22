const { User } = require('../models');
// const Book = require('../models/Book');
const { signToken, AuthError } = require('../utils/auth');

const resolver = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, {userId}) => {
        console.log(`Requested User ID => `+userId)
      return User.findOne({ _id: userId })
      .select('-__v')
      .populate('savedBooks');
    },
    me: async (_, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw new AuthError;
      },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthError('User account was not found');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthError('One of your credentials incorrect. Please reinter and try again');
      }
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, {authors,bookId,title,link,image,description}, context) => {
        if (bookId) {
       return User.findOneAndUpdate(
          { _id: context.user._id },
          {$addToSet: {
            savedBooks: {authors: authors,bookId,title,link,image,description}
            }},
          {new: true}
        ); 
      }
      throw new AuthError("You aren't logged in!");
    },
    removeBook: async (_, { bookId }, context) => {
        if (bookId) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { 
            $pull: { 
                savedBooks: {
                    bookId: bookId 
            } } },
            {new: true}
        );
      }
      throw new AuthError("You aren't logged in");
    },
  },
};

module.exports = resolver;