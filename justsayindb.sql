CREATE TABLE languages (
  iso_code VARCHAR(5) PRIMARY KEY,
  language_name VARCHAR(25)
);
CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  target_lang_code VARCHAR REFERENCES languages (iso_code),
  oauth_id VARCHAR(150) UNIQUE
);

CREATE TABLE contacts (
  id serial PRIMARY KEY,
  owner_id INTEGER REFERENCES users (id),
  contact_id INTEGER REFERENCES users (id),
  isFavorite BOOLEAN
);

CREATE TABLE user_auth_tokens (
  owner_id INTEGER REFERENCES users (id),
  auth_token VARCHAR(255)
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

