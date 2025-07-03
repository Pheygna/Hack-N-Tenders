CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);

INSERT INTO users (username, password) VALUES
('admin', 'admin123'),
('user', 'user123'),
('test', 'test123');
