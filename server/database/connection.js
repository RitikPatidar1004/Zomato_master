const Mongoose = require("mongoose");

module.exports = async () => {
  return Mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
