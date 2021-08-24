DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(50) NOT NULL,
    name varchar(30) NOT NULL,
    message varchar(400) NOT NULL
);
