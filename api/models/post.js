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

  static findByQuery(query) {
    return new Promise(async (resolve, reject) => {
      try {
        let postsData = await db.query(`SELECT * FROM posts 
                                       WHERE title   ILIKE $1
                                       OR    name    ILIKE $1
                                       OR    message ILIKE $1`, ['%' + query + '%']);
        const posts = postsData.rows.map((d) => new Post(d));
        resolve(posts);
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
