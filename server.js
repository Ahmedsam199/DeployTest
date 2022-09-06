const express = require('express')
const app= express();
var cors = require("cors");
app.use(cors());
const Pusher = require("pusher");
app.options("*", cors());

const pusher = new Pusher({
  appId: "1464760",
  key: "902a182571ab0eaf222f",
  secret: "9245d2e3538084fb4b19",
  cluster: "ap2",
  useTLS: true,
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/TestDeploy',(req,res)=>{
  res.send("Hello World");
})
app.post("/Users/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const userData = { email: email, password: password };
  console.log(email + " " + password);
  res.send(userData);
  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
});
app.listen(8080)