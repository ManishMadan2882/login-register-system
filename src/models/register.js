const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reg-form",{useNewUrlParser: true, useUnifiedTopology:true})
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
});
//create collection now
const Register = new  mongoose.model("Register",schema   );
module.exports = Register;