const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();
const recaptcha_server_key = process.env.recaptcha_server_key;

app.use(express.static("public"));
// app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/view/test.html");
});

app.post("/upload", function (req, res) {
  const params = new URLSearchParams({
    secret: recaptcha_server_key,
    response: req.body["g-recaptcha-response"],
    remoteip: req.ip,
  });

  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => console.error(err));
});

app.listen(port, () => {
  // 啟動伺服器在port 3000
  console.log(`伺服器已經啟動在port${port}: http://127.0.0.1:3000/`);
});
