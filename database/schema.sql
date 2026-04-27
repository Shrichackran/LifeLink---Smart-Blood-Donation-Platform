CREATE DATABASE lifelink;

USE lifelink;

CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    blood_group VARCHAR(5),
    location VARCHAR(100),
    availability BOOLEAN
);

INSERT INTO donors (name, blood_group, location, availability) VALUES
('Arun', 'O+', 'Salem', 1),
('Kumar', 'A+', 'Salem', 1),
('Ravi', 'B+', 'Chennai', 1),
('Suresh', 'O+', 'Salem', 0);

