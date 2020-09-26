const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://rhernando:${process.env.MONGO_PASSWORD}@node-auth-cluster.l5m3p.mongodb.net/nodejs-passport?retryWrites=true&w=majority`;

const connectToDb = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to Mongo Database!!!");
    })
    .catch((e) => console.log(e));
};

module.exports = connectToDb;
