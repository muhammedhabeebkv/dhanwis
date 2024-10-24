const models = require("../config/model");
const bcrypt = require("bcrypt");
const accountSid = "AC9bdd0db87bca6c6a50d0c54a53e0c914";
const authToken = "2d5d6dd4bbd08cc93f08cb3a2aee1685";
const client = require("twilio")(accountSid, authToken);

module.exports = {
  login: (phone, password) =>
    new Promise((resolve, reject) => {
      models.users
        .findOne({ phone: phone })
        .then((response) => {
          if (response) {
            bcrypt
              .compare(password, response.password)
              .then((isValid) => {
                if (isValid) {
                  resolve(response);
                } else {
                  reject("Invalid credentials");
                }
              })
              .catch((err) => {
                reject("Invalid credentials");
              });
          } else {
            reject("Invalid credentials");
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),
  signUp: (phone, name, password) =>
    new Promise((resolve, reject) => {
      models.users
        .findOne({ phone: phone })
        .then((response) => {
          if (response) {
            reject("User already exists!");
          } else {
            const SALT_ROUND = bcrypt.genSaltSync(10);
            let otp = Math.floor(100000 + Math.random() * 900000);

            return models.users.create({
              phone: phone,
              name: name,
              password: bcrypt.hashSync(password, SALT_ROUND),
              otp: otp,
              verified: false,
            });
          }
        })
        .then((response) => {
          return response?.save();
        })
        .then((isSaveUserData) => {
          client.messages
            .create({
              body: `You otp code is ${isSaveUserData.otp}`,
              to: `+91${isSaveUserData.phone}`,
              from: "+12054093416",
            })
            .then((message) => console.log(message.sid))
            .catch((error) => {
              error.status = 400;
              error.message = "Failed to send OTP";
            });
          resolve(isSaveUserData);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  otp: (phone, otp) =>
    new Promise((resolve, reject) => {
      models.users
        .findOne({ phone: phone })
        .then((userData) => {
          if (userData.otp === otp) {
            resolve(userData);
          } else {
            reject("Invalid OTP");
          }
        })
        .catch((error) => {
          reject(error);
        });
    }),
};
