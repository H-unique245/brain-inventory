const { model,Schema } = require("mongoose");

const UserSchema= new Schema ({
    name : String,
    Phone:Number,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    version:false
})

const UserModel = model("users", UserSchema);

module.exports= UserModel;