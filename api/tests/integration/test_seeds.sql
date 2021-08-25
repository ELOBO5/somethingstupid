TRUNCATE posts RESTART IDENTITY;

INSERT INTO posts (title, name, message) 
VALUES
(
    'Title 1', 
    'User 1', 
    'First test message'
),
(
    'Title 2', 
    'User 2', 
    'Second test message'
),
(
    'Title 3', 
    'User 3', 
    'Third test message'

);
