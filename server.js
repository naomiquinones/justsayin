require("dotenv").config();
require("path");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// bring in messaging files
const viewSMS = require("./messaging/view_sms");
const sendSMS = require("./messaging/send_sms");

// bring in translation file
const translator = require("./translate/translate");

// database
// get contacts
const getContacts = async (request, response) => {
  const { owner_id } = request.query;
  console.log("owner_id is", owner_id);

  const client = await pool.connect();
  try {
    const results = await pool.query(
      "SELECT id, first_name, last_name, phone, target_lang_code FROM users WHERE id IN (SELECT contact_id FROM contacts WHERE owner_id=$1)",
      [owner_id]
    );
    console.log("get contacts", results.rows);
    response.status(200).json(results.rows);
  } catch (e) {
    response
      .status(500)
      .json(`Problem getting contacts. The error is:\n-*-*-*-*\n${e}`);
    throw e;
  } finally {
    client.release();
  }
};

// add contact
const addContact = async (request, response) => {
  const {
    owner_id,
    first_name,
    last_name,
    email,
    phone,
    target_lang_code
  } = request.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertUserText =
      "INSERT INTO users (first_name, last_name, email, phone, target_lang_code) VALUES ($1,$2,$3,$4,$5) RETURNING id";
    const res = await client.query(insertUserText, [
      first_name,
      last_name,
      email,
      phone,
      target_lang_code
    ]);
    const insertContactText =
      "INSERT INTO contacts(owner_id, contact_id) VALUES ($1, $2)";
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
  const { number, message } = req.body;

  let msg = message;
  let recipient = number;

  if (!msg || !recipient) {
    res.status(500).json("Missing message text or recipients");
  }
  // Send a message
  sendSMS.send(recipient, msg);

  let confirmation = `Message sent to ${recipient}: ${msg}`;

  res.status(200).json(confirmation);
});

// Below post for twilio incoming
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Thank you for helping test this app");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// viewSMS.viewAll();

// make catchall endpoint

// Set app to listen on the server
app.listen(port, hostname, () =>
  console.log(`Using CORS. Server started on ${hostname} at port ${port}`)
);
