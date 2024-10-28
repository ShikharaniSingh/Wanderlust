const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(() => {
//     console.log("connected to DB");
//     })
//     .catch((err) => {
//     console.log(err);
//     });
main()
    .then(() => {
        console.log("connected to DB");
        return initDB(); // Added return statement here
    })
    .then(() => {
        console.log("data was initialized"); // Moved this inside the .then() of initDB
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"671a6fe0a721c4be7c1fb8c8", image:obj.image.url}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();