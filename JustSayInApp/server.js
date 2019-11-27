require("dotenv").config();

// Read the host address and port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const { pool } = require("./config");
const app = express();

const MessagingResponse = require("twilio").twiml.MessagingResponse;

app.use(cors());
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// bring in messaging files
const viewSMS = require("./messaging/view_sms");
const sendSMS = require("./messaging/send_sms");

// bring in translation file
const translator = require("./translate/translate");

// database
// get contacts
const getContacts = async (request, response) => {
  console.log(request.query.owner_id);
  const { owner_id } = request.query;
  console.log(owner_id);
  const client = await pool.connect();
  try {
    const results = await pool.query(
      "SELECT id, first_name, phone, target_lang_code FROM users WHERE id IN (SELECT contact_id FROM user_contacts WHERE owner_id=$1)",
      [owner_id]
    );
    console.log(results);
    response.status(200).json(results.rows);
  } catch (e) {
    response.status(500).json("Problem getting contacts");
    throw e;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};

// add contact
const addContact = async (request, response) => {
  const {
    owner_id,
    contact_first_name,
    contact_last_name,
    contact_email,
    contact_phone,
    contact_target_lang
  } = request.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText =
      "INSERT INTO users(first_name, phone, user_password, target_lang_code) VALUES($1,$2,$3,$4,$5) RETURNING id";
    const res = await client.query(queryText, [
      contact_first_name,
      contact_last_name,
      contact_email,
      contact_phone,
      contact_target_lang
    ]);
    const insertContactText =
      "INSERT INTO user_contacts(owner_id, contact_id) VALUES ($1, $2)";
    const insertContactValues = [owner_id, res.rows[0].id];
    await client.query(insertContactText, insertContactValues);
    await client.query("COMMIT");
    response.status(200).json("Contact inserted");
  } catch (e) {
    await client.query("ROLLBACK");
    response.status(500).json("Problem inserting contact");
    throw e;
  } finally {
    client.release();
  }
};

//
app
  .route("/contacts")
  // get contacts endpoint
  .get(getContacts)
  // add contacts endpoint
  .post(addContact);

// language list endpoint
app.get("/languages", async (req, res) => {
  console.log("get languages");
  const langs = await translator.getSupportedLanguages("en");

  res.status(200).json(langs);
});

// send languages endpoint
app.post("/languages", (req, res) => {
  res.send("languages:").sendStatus(200);
});

// translation endpoint
app.post("/translate", async (req, res) => {
  const textToTranslate = req.body.text;
  const sourceLang = req.body.source;
  const targetLang = req.body.target;

  // for (let lang of targetLangs) {
  const translation = await translator.translate(
    textToTranslate,
    sourceLang,
    targetLang
  );
  // console.log("the translated text is:",translation);
  // }
  res.status(200).json(translation);
});

// send SMS message
app.post("/sendmessage", (req, res) => {
  console.log(req.body);
  const { numbers, message } = req.body;

  let msg = message || "Special message from the Just Say In app";
  for (number of numbers) {
    // get one recipient
    let recipient = number; //|| [process.env.TEST_RECIPIENT1];

    // for (let recipient of recipients) {
    // Send a message
    sendSMS.send(recipient, msg);
  }
  console.log(recipient);
  res.send(200).json("Message sent to", recipient);
});

// Below post for twilio incoming
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Thank you for helping test this app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// viewSMS.viewAll();

// Set app to listen on the server
app.listen(port, hostname, () =>
  console.log(`Using CORS. Server started on ${hostname} at port ${port}`)
);
