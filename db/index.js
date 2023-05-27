const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI

// const MONGO_URI = "mongodb://127.0.0.1:27017/probando-auth-port"

mongoose.connect(MONGO_URI)
.then(x => {
    const dbName = x.connections[0].name;
    console.log(`Conncted to: >${dbName}<`);
})
.catch(err => {
    console.error("Error connecting to Mongo: ", err);
});