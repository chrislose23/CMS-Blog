const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123'
  }
];

const postData = [
  {
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    user_id: 1
  },
  {
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    user_id: 2
  }
];

const commentData = [
  {
    comment_text: 'This is a comment on the first blog post.',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'This is another comment on the first blog post.',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'This is a comment on the second blog post.',
    user_id: 1,
    post_id: 2
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log('Database synced');

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log('Users seeded');

    await Post.bulkCreate(postData);

    console.log('Posts seeded');

    await Comment.bulkCreate(commentData);

    console.log('Comments seeded');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();