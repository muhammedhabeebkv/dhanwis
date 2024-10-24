const router = require("express").Router();

const authController = require("../controller/authController");


router.get("/auth", (req, res) => {
  res.status(200).json({ status: 200, userData: req.session.user, message: "logged successfully." });
})

router.post("/auth", async (req, res, next) => {
  let error = new Error("");
  let { type } = req.query;
  let { phone, name, password, otp } = req.body;

  if ((type === "login" && !phone && !password) || (type === "sign-up" && !phone && !name && !password) || (type === "otp" && !otp)) {
    error.status = 400;
    error.message = "Please enter all required input";
    return next(error);
  }

  if (type == "login") {
    authController
      .login(phone, password)
      .then((response) => {
        let user = {
          loggin: true,
          phone: response.phone,
          name: response.name,
          verified: response.verified,
        };

        req.session.user = user;
        res.status(201).json({ status: 201, userData: user, message: "logged successfully." });
      })
      .catch((err) => {
        error.status = 400;
        error.message = err;
        return next(error);
      });
  } else if (type == "sign-up") {
    authController
      .signUp(phone, name, password)
      .then((response) => {
        let user = {
          loggin: true,
          phone: response.phone,
          name: response.name,
          verified: response.verified,
        };

        req.session.user = user;
        req.session.otp = response.otp;

        res.status(201).json({ status: 201, userData: user, message: "Account Created successfully." });
      })
      .catch((err) => {
        error.status = 400;
        error.message = err;
        return next(error);
      });
  } else if (type == "otp") {
    authController
      .otp(req.session.user.phone, otp)
      .then((response) => {
        let user = {
          loggin: true,
          phone: response.phone,
          name: response.name,
          verified: response.verified,
        };

        req.session.otp = response.otp;
        req.session.user.verified = true;

        res.status(201).json({ status: 201, userData: user, message: "Account Created successfully." });
      })
      .catch((err) => {
        error.status = 400;
        error.message = err;
        return next(error);
      });
  } else {
    error.status = 400;
    error.message = "Invalid request!";
    return next(error);
  }
});

module.exports = router;
