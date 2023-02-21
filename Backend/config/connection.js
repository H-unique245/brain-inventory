const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set('strictQuery', true);

const Connection = mongoose.connect(process.env.DB_URL);

module.exports = { Connection };


// DB_URL="mongodb+srv://hemant:hemant@cluster0.1tk1r.mongodb.net/brainInventory?retryWrites=true&w=majority"
