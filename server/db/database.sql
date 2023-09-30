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

INSERT INTO health_record (date_visit, description, pet_id) VALUES 
('2023-05-24', 'Annual Check Up DHPP (annual)\nBordetella (annual)\nDeworm - Pyrantel', 2),

INSERT INTO health_record (date_visit, description, pet_id) VALUES
('2022-07-28', E'PreOp Panel(CBC 10)(in-house)\nIV catheterization\nIV fluid therapy(surgery)\nAnesthesia(Isoflurane) 40-60\nAnesthesia Monitoring\nPenicillin Inj\nDental Cleaning/Polish(dog)\n41-60 Minor', 2);

INSERT INTO health_record (date_visit, description, pet_id) VALUES 
('2021-11-04', E'Annual Check Up DHPP (annual)\nRabies (3 year)\nCytopoint (40-50)\nCefpodoxime 100mg', 3);

INSERT INTO health_record (date_visit, description, pet_id, due_date_shots) VALUES 
('2022-05-27', E'Annual Check Up\nConvenia Inj\nApoquel 5.4mg\nEar cleaning and medication\nClaro (1pk)\nTonometry (glaucoma check up)', 1, E'Rabies (3 Year) - 03/26/2023\nBordetella (annual) - 02/11/2023');

INSERT INTO health_record (date_visit, description, pet_id, due_date_shots) VALUES 
('2015-07-15', E'Annual Check Up\nIvermectin (0.2 mg/kg)\nMetronidazole\n', 16, E'Up to date');

ALTER TABLE pet
ADD COLUMN owner_id INTEGER;

ALTER TABLE owner
ADD COLUMN pet_id INTEGER;

ALTER TABLE health_record
ADD COLUMN due_date_shots VARCHAR;

UPDATE health_record
SET description =
E'PreOp Panel(CBC 10)(in-house)\nIV catheterization\nIV fluid therapy(surgery)\nAnesthesia(Isoflurane) 40-60\nAnesthesia Monitoring\nPenicillin Inj\nDental Cleaning/Polish(dog)\n41-60 Minor'
WHERE hr_id = 5;

UPDATE health_record
SET due_date_shots = E'Rabies (3 Year) - 11/04/2025\nDHPP (annual) - 11/04/2022\nBordetella (annual) - 11/04/2022'
WHERE hr_id = 6;

UPDATE health_record
SET due_date_shots = E'Rabies (3 Year) - 11/03/2025\nDHPP (annual) - 05/23/2024\nBordetella (annual) - 05/23/2024'
WHERE hr_id = 1;

UPDATE health_record
SET due_date_shots = E'Rabies (3 Year) - 10/21/2022\nDHPP (annual) - 06/20/2023\nBordetella (annual) - 06/20/2023'
WHERE hr_id = 5;

SELECT *, 
    TO_CHAR(date_visit::date, 'MM/DD/YYYY') AS formatted_date_visit 
    FROM health_record 
    WHERE pet_id = $1
    ORDER BY formatted_date_visit DESC;

SELECT *, 
    TO_CHAR(hr.date_visit::date, 'MM/DD/YYYY') AS formatted_date_visit,
    p.name, 
    FROM health_record hr
    INNER JOIN pet p
    ON hr.pet_id = p.pet_id
    WHERE pet_id = $1
    ORDER BY formatted_date_visit DESC;

SELECT *, 
    TO_CHAR(date_visit::date, 'MM/DD/YYYY') AS formatted_date_visit,
    name 
    FROM health_record
    INNER JOIN pet USING (pet_id)
    WHERE pet_id = $1
    ORDER BY formatted_date_visit DESC;

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

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb, owner_id)
VALUES ('Jasper', '2012-05-03', '11', 'Dog', 'Pembroke Welsh Corgi', 'M', '30', '6e25e185-e169-48f1-ac21-100cc621fa99');

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb, owner_id) 
VALUES ('Flowers', '2019-05-22', '2', 'Guinea Pig', 'Short-hair Guinea', 'F', '9',  '6e25e185-e169-48f1-ac21-100cc621fa99');

INSERT INTO pet (name, dob, age, species, breed, gender, weight_lb, owner_id)
VALUES ('Mr. Whiskers', '2011-10-23', '4', 'Capybara', 'H. hydrochaeris', 'M', '70', '057eaacc-2d5d-49e4-89af-80319c26a2ef');


SELECT *, 
    TO_CHAR(date_visit::date, 'MM/DD/YYYY') AS formatted_date_visit,
    name 
    FROM health_record
    INNER JOIN pet USING (pet_id)
    WHERE pet_id = ANY($1::integer[])
    ORDER BY formatted_date_visit ASC;


SELECT *,
    TO_CHAR(dob::date, 'MM/DD/YYYY') AS formatted_dob,
    user_name
    FROM pet
    INNER JOIN owner USING (owner_id) 
    WHERE owner_id = $1