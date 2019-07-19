const uuidv1 = require('uuid/v1');

const Ideas = require('../../models/ideas');
const Users = require('../../models/users');

const AppModule = {
  userLogin: async ({ username, password }) => {
    const user = await Users.findOne({
      where: {
        username,
        password,
      },
    });
    return user;
  },
  getIdeas: async () => {
    const allIdeas = await Ideas.findAll({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    });
    return allIdeas;
  },

  getIdeaById: async (id) => {
    const idea = await Ideas.findOne({
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
      where: {
        id,
      },
    });
    return idea;
  },

  addIdea: async ({ title, description, author }) => {
    const addedIdea = await Ideas.create({
      id: uuidv1(), title, description, author,
    });
    return addedIdea.id;
  },

  deleteIdea: async (id) => {
    await Ideas.destroy({
      where: {
        id,
      },
    });
  },

  editIdea: async (attributes) => {
    await Ideas.update(attributes, {
      where: {
        id: attributes.id,
      },
    });
    return true;
  },


};

module.exports = AppModule;
