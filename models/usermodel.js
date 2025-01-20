let mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/DetailsofUsers").then((conc)=>{
    console.log("Database Connected..");
})

let UserSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        image:String,
    }
)

module.exports = mongoose.model("UserModel",UserSchema);