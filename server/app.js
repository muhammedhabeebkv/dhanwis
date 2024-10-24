const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")
const session = require("express-session");
const connect = require("./config/connection");

// configuration
const PORT = process.env.PORT || 3001;
require("dotenv").config();
connect((msg) => {
  console.log(msg);
});


// Route configuration
let userRouter = require("./routers/user");
const { error } = require("console");

// middleware configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
}))
app.use(session({
	secret: "dhanwis-secret",
	name: "Set-Cookie",
	cookie: {
		httpOnly: true,
		path: "/",
		sameSite: "strict",
	},
}))

app.use("/api/user", userRouter);

app.use("/*", (req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message = "Invalid url";
  return next(error);
});

app.use(function (err, req, res, next) {
  console.error("From Error handler: ", err.message);
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => console.log("listening on port", PORT));
