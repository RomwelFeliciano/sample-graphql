const mysql = require("mysql2/promise");

// Set up MySQL Connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "simple-schema",
});

const resolvers = {
  Query: {
    // Get All Users
    getUsers: async () => {
      const [users] = await pool.query("SELECT * FROM users");
      return users;
    },

    // Get All Posts
    getPosts: async () => {
      const [posts] = await pool.query("SELECT * FROM posts");
      // console.log(posts);
      return posts;
    },

    // Get All Comments
    // getComments: async () => {
    //   const [comments] = await pool.query("SELECT * FROM comments");
    //   return comments;
    // },

    // Get A Specific User
    // getUser: async (_, { id }) => {
    //   const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    //   return user[0];
    // },

    // Get A Specific Post
    getPost: async (_, { id }) => {
      const [post] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
      return post[0];
    },

    // Get A Specific Comment
    // getComment: async (_, { id }) => {
    //   const [comment] = await pool.query(
    //     "SELECT * FROM comments WHERE id = ?",
    //     [id]
    //   );
    //   return comment[0];
    // },
  },

  // List All Comments in a Specific Post
  Post: {
    comments: async (post) => {
      const [comments] = await pool.query(
        "SELECT * FROM comments WHERE post_id = ?",
        [post.id]
      );
      return comments;
    },

    // author: async (post) => {
    //   const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
    //     post.user_id,
    //   ]);
    //   console.log(user);
    //   return user[0];
    // },
  },

  // List All Posts in a Specific User
  User: {
    posts: async (user) => {
      const [posts] = await pool.query(
        "SELECT * FROM posts WHERE user_id = ?",
        [user.id]
      );
      return posts;
    },
  },
};

module.exports = resolvers;
