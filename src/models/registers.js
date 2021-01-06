const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const employeeSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
//encryption of middleware 
employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);//this.password means current password
        this.confirmpassword=undefined;//isko undefind ker denge due to security reason
    }
    next();//then we notification then now the save() can run
})

//now we create a collection
//const Register=new mongoose.model("Register",employeeSchema);
const Register=new mongoose.model("Register",employeeSchema);
module.exports=Register;