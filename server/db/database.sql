CREATE DATABASE pet_health_online;

CREATE TABLE pet(
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE NOT NULL,
    age INTEGER NOT NULL,
    species VARCHAR NOT NULL,
    breed VARCHAR NOT NULL,
    gender TEXT NOT NULL,
    weight_lb INTEGER NOT NULL,
);

