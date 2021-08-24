DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(40) NOT NULL,
    name varchar(20) NOT NULL,
    message varchar(250) NOT NULL,
);