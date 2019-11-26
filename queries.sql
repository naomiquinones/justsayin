SELECT users.*, 
FROM users 
INNER JOIN (
  SELECT b.contact_id
  FROM users AS a
  INNER JOIN user_contacts AS b on a.id = b.owner_id
  WHERE a.id = 1--users id here
) AS subquery ON users.id = subquery.contact_id
;

SELECT id, first_name, phone, target_lang_code 
FROM users 
WHERE id IN
 (SELECT contact_id FROM user_contacts WHERE owner_id=1)
 ;