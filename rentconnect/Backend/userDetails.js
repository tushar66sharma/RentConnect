const mongoose= require("mongoose");
const UserDetailSchema= new mongoose.Schema({
    email: {type:String,unique:true,required:true} ,
    password: String,
    name: String,
    mobileNo: Number,
    rollNo: String ,
},
{
    collection: "UserInfo"
}
);
mongoose.model("UserInfo",UserDetailSchema);