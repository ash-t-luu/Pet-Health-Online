CREATE DATABASE pet_health_online;

//old 
CREATE TABLE pet(
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE NOT NULL,
    age INTEGER NOT NULL,
    species VARCHAR NOT NULL,
    breed VARCHAR NOT NULL,
    gender TEXT NOT NULL,
    weight_lb INTEGER NOT NULL,
    owner_id INTEGER REFERENCES owner (owner_id)
);

//new
CREATE TABLE pet (
    pet_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    age TEXT NOT NULL,
    species VARCHAR(200) NOT NULL,
    breed VARCHAR(200) NOT NULL,
    gender TEXT NOT NULL,
    weight_lb TEXT NOT NULL,
    owner_id UUID REFERENCES owner(owner_id)
);

CREATE TABLE health_record (
    hr_id SERIAL PRIMARY KEY,
    date_visit DATE NOT NULL,
    description VARCHAR NOT NULL,
    pet_id INTEGER REFERENCES pet (pet_id)
);

CREATE TABLE veterinarian(
    vet_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone_number INTEGER NULL,
    CONSTRAINT owner_id INTEGER REFERENCES owner,
    CONSTRAINT pet_id INTEGER REFERENCES pet
)

//old 
CREATE TABLE owner(
    owner_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL UNIQUE ,
    user_password VARCHAR(200) NOT NULL,
    pet_id INTEGER REFERNECES pet (pet_id)
);

//new
CREATE TABLE owner (
    owner_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL UNIQUE,
    user_password VARCHAR(200) NOT NULL
);

CREATE TABLE owner_pet (
    owner_id uuid REFERENCES owner(owner_id),
    pet_id serial REFERENCES pet(pet_id),
    PRIMARY KEY (owner_id, pet_id)
);


CREATE TABLE medication(
    med_id SERIAL PRIMARY KEY,
    rx_number INTEGER NOT NULL,
    rx_name VARCHAR NOT NULL,
    date_start DATE NOT NULL,
    date_expired DATE NOT NULL,
    description VARCHAR NOT NULL,
    CONSTRAINT vet_id INTEGER REFERENCES veterinarian,
    CONSTRAINT pet_id INTEGER REFERENCES pet
);

CREATE TABLE appointment(
    app_id SERIAL PRIMARY KEY,
    app_date DATE NOT NULL,
    reason VARCHAR NOT NULL,
    CONSTRAINT vet_id INTEGER REFERENCES veterinarian,
    CONSTRAINT pet_id INTEGER REFERENCES pet
);

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb, owner_id)
VALUES ('Odie', '2007-03-10', 13, 'Dog', 'Cocker Spaniel Mix', 'M', 25);

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb, owner_id)
VALUES ('Jasper', '2012-05-03', '11', 'Dog', 'Pembroke Welsh Corgi', 'M', '30', '6e25e185-e169-48f1-ac21-100cc621fa99');

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb)
VALUES ('Lilo', '2019-06-10', 2, 'Guinea Pig', 'Long-hair Guinea', 'F', 6);

INSERT INTO owner (user_name, user_email, user_password) 
VALUES ('Jane Smith', 'jane504@gmail.com', 'password123');

INSERT INTO owner (user_name, user_email, user_password, pet_id) 
VALUES ('John Doe', 'johnD@gmail.com', '123password', 5);

INSERT INTO owner (user_name, user_email, user_password, pet_id) 
VALUES ('Julia H', 'catl0ver@yahoo.com', 'cats123', 12, 13);


CREATE TABLE health_record (
    hr_id SERIAL PRIMARY KEY,
    date_visit DATE NOT NULL,
    description VARCHAR NOT NULL,
    pet_id INTEGER REFERENCES pet (pet_id)
);

INSERT INTO health_record (date_visit, description, pet_id) VALUES 
('2023-05-24', 'Annual Check Up DHPP (annual) Bordetella (annual) Deworm - Pyrantel', 2),
('2022-07-28', 'PreOp Panel(CBC/Chem 10)(in-house) IV catheterization IV fluid therapy(surgery) Anesthesia(Induction/Isoflurane) 40-60 Anesthesia Monitoring Penicillin Inj Dental Cleaning/Polish(dog) 41-60 Minor', 2);


ALTER TABLE pet
ADD COLUMN owner_id INTEGER;

ALTER TABLE owner
ADD COLUMN pet_id INTEGER;
