CREATE TABLE languages (
  iso_code VARCHAR(5) PRIMARY KEY,
  languagename VARCHAR(25)
)
CREATE TABLE users (
 id serial PRIMARY KEY,
 oauth_id VARCHAR(150) UNIQUE,
 firstname VARCHAR(100),
 lastname VARCHAR(100),
 email VARCHAR(100),
 phone VARCHAR(15),
 target_lang_code VARCHAR REFERENCES languages (iso_code),
 password VARCHAR(50)
);

CREATE TABLE user_contacts (
 id serial PRIMARY KEY,
 owner_id INTEGER REFERENCES users (id),
 contact_id INTEGER REFERENCES users (id),
 block_ BOOLEAN,
 favorite BOOLEAN
);

CREATE TABLE groups (
 id serial PRIMARY KEY,
 name VARCHAR(150),
 owner INTEGER REFERENCES users (id),
 contact INTEGER REFERENCES users (id)
);

CREATE TABLE messages (
 id serial PRIMARY KEY,
 msg VARCHAR(10000),
 sender INTEGER REFERENCES users (id),
 recipient INTEGER REFERENCES users (id),
 contact_group INTEGER REFERENCES groups (id),
 language_code INTEGER REFERENCES languages (id),
 created_at TIMESTAMP
);

-- 
-- 
INSERT INTO languages (
  iso_code,
  name
)
VALUES
('en','English'),
('th','Thai'),
('id','Indonesian'),
('es','Spanish'),
('zh','Chinese Simplified'),
('ar','Arabic'),
('fr','French'),
('nl','Dutch'),
('pt','Portuguese'),
('ru','Russian')
;
INSERT INTO users (
  name,
  phone,
  password,
  target_lang_code
)
VALUES
('Naomi','13102547608','test','en'),
('Noi','15102258545','test', 'th'),
('Mega','17076068321','test','id')
;

-- 
INSERT INTO user_contacts (
  owner,
  contact
)
VALUES
(1,2),
(1,3)
;
-- 
-- 
SELECT users.name,user_contacts.contact_id,users.target_lang_code
FROM user_contacts
INNER JOIN users
ON users.id = user_contacts.owner
WHERE user_contacts.owner = --users id here
;