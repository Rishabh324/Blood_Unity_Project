const mongoose = require("mongoose");

const connectDB = async () => {
    const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    await mongoose
        .connect(DB)
        .then(() => console.log("connected database"))
        .catch(err => console.log(err));
}

module.exports = connectDB;