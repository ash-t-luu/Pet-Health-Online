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
    pet_id INTEGER REFERNECES pet (pet_id)
);

CREATE TABLE health_record(
    hr_id SERIAL PRIMARY KEY,
    date_visit DATE NOT NULL,
    due_date DATE NOT NULL,
    description VARCHAR NOT NULL,
    CONSTRAINT vet_id INTEGER REFERENCES veterinarian,
    CONSTRAINT pet_id INTEGER REFERENCES pet
);

CREATE TABLE veterinarian(
    vet_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone_number INTEGER NULL,
    CONSTRAINT owner_id INTEGER REFERENCES owner,
    CONSTRAINT pet_id INTEGER REFERENCES pet
)

CREATE TABLE owner(
    owner_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL UNIQUE ,
    user_password VARCHAR(200) NOT NULL,
    pet_id INTEGER REFERNECES pet (pet_id)
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

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb)
VALUES ('Odie', '2007-03-10', 13, 'Dog', 'Cocker Spaniel Mix', 'M', 25);

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb)
VALUES ('Lilo', '2019-06-10', 2, 'Guinea Pig', 'Long-hair Guinea', 'F', 6);

INSERT INTO owner (user_name, user_email, user_password, pet_id) 
VALUES ('Jane Smith', 'jane504@gmail.com', 'password123', 4);

INSERT INTO owner (user_name, user_email, user_password, pet_id) 
VALUES ('John Doe', 'johnD@gmail.com', '123password', 5);

INSERT INTO owner (user_name, user_email, user_password, pet_id) 
VALUES ('Julia H', 'catl0ver@yahoo.com', 'cats123', 12, 13);

ALTER TABLE pet
ADD CONSTRAINT fk_owner_id
FOREIGN KEY (owner_id) REFERENCES owner(owner_id);

ALTER TABLE pet
ADD COLUMN owner_id INTEGER;

ALTER TABLE owner
ADD COLUMN pet_id INTEGER;

ALTER TABLE owner
ADD CONSTRAINT fk_pet_id
FOREIGN KEY (pet_id) REFERENCES pet(pet_id);

UPDATE pet
SET owner_uuid = 'a7723ad9-360b-4d61-9179-56dec5bde09a'
WHERE pet_id = 4;

UPDATE pet
SET owner_uuid = '8728ac7e-ea16-46ca-9ad0-a3e64e07dc93'
WHERE pet_id = 5;