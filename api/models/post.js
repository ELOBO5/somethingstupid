const db = require("../dbConfig");

class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.name = data.name;
    this.message = data.message;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const postsData = await db.query(`SELECT * FROM posts;`);
        const posts = postsData.rows.map((d) => new Post(d));
        console.log(posts);
        resolve(posts);
      } catch (err) {
        reject("Error retrieving posts");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [
          id,
        ]);
        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (err) {
        reject("Post not found");
      }
    });
  }

  static create(title, name, message) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(
          `INSERT INTO posts (title, name, message) VALUES ($1, $2, $3) RETURNING *;`,
          [title, name, message]
        );
        let newPost = new Post(postData.rows[0]);
        resolve(newPost);
      } catch (err) {
        reject("Error creating post");
      }
    });
  }
}

module.exports = Post;
