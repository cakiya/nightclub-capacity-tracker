DROP table if EXISTS clubs CASCADE;

CREATE TABLE clubs (
    id   SERIAL PRIMARY KEY not null,
    name TEXT not null,
    location TEXT not null,
    genre TEXT not null,
    max INTEGER not null default 100,
    warning INTEGER not null default 80,
    count INTEGER not null default 0
);


INSERT INTO clubs(name, location, genre, max, warning) VALUES 
    ('Club Arcane', 'League of Legends City', 'Rap', 100, 70),
    ('Club Paradisio', 'Los Angeles', 'Jazz', 5, 3),
    ('Club Underground', 'Rochester', 'Rock', 50, 30),
    ('Club Soda', 'NYC', 'Pop', 20, 12);



