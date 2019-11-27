CREATE TABLE languages (
  iso_code VARCHAR(5) PRIMARY KEY,
  language_name VARCHAR(25)
);
CREATE TABLE users (
  id serial PRIMARY KEY,
  oauth_id VARCHAR(150) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  target_lang_code VARCHAR REFERENCES languages (iso_code),
  user_password VARCHAR(50)
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
  group_name VARCHAR(150),
  group_owner INTEGER REFERENCES users (id),
  group_member INTEGER REFERENCES users (id)
);

CREATE TABLE messages (
  id serial PRIMARY KEY,
  msg VARCHAR(10000),
  sender INTEGER REFERENCES users (id),
  recipient INTEGER REFERENCES users (id),
  contact_group INTEGER REFERENCES groups (id),
  language_code VARCHAR REFERENCES languages (iso_code),
  created_at TIMESTAMP
);

-- 
-- 
INSERT INTO languages (
  iso_code,
  language_name
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

-- 
INSERT INTO user_contacts (
  owner_id,
  contact_id
)
VALUES
(1,4),
(1,3),
(1,2),
(3,4)
;