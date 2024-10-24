const mongoose = require("mongoose");

const connect = (callback) => {
  const url = "mongodb+srv://ph1shn3t:C8N8xM8t6X_Y3hW@phish-net.hu3p0.mongodb.net/?retryWrites=true&w=majority&appName=phish-net";

  mongoose
    .connect(url)
    .then(() => callback("Database Connection Established!"))
    .catch((err) => callback("Database Connection Not Established! \n" + err.message));
};

module.exports = connect;
