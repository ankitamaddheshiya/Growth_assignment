// importing all module-------->
const mongoose = require("mongoose");


//Schema for user -------->
const userSchema = mongoose.Schema({
     name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
})

// model for user------>
const UserModel = mongoose.model("user",userSchema);


//export module---->
module.exports={
    UserModel
}