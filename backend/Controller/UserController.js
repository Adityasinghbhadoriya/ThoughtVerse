const UserModel = require("../Models/UserModel");
const bcryptjs = require("bcryptjs");

 const signup= async (req,res)=>{
    try {
       const {username,email,password}=req.body;
       const user= await UserModel.findOne({email}) 
       if(user){
        return res.status(400).json({message:"User already exists"})
       } 
       const hashPassword = await bcryptjs.hash(password,10)
       const createdUser=new UserModel({
        username: username,
        email: email,
        password: hashPassword,
       })
       await  createdUser.save()
       res.status(201).json({message:"User created Successfully"})
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({message: "Internal server error"});
    }
};

//Ab login ke liye kr rhe h, isme pehle toh do hi fields h ek email dalo or ek password toh un dono ko body se pehle require krege or fir uss email ko find krege ki if that email exist , fir check krege ki user ne jo password dala h vo humare database me jo same user ne signup krte time password dala tha usse match khata h ki ni toh uske liye user.password ka use krege user.password humare database me jo password h usko denote krra h or sirf password jo likha h vo humare user ne jo current password dala vo denote krra h.
 const login = async (req,res) =>{
    try {
      const {email,password} = req.body;
      const user = await UserModel.findOne({email});
      const isMatch = await bcryptjs.compare(password, user.password)
      if(!user || !isMatch){
        return res.status(400).json({message: "Invalid username or password"})
      }
      else{
        res.status(200).json({message: "Login Successfull", user:{
          _id: user._id,
          username: user.username,
          email: user.email
        }})
      }
    } catch (error) {
      console.log("Error: " + error.message)
      res.status(500).json({message: "Internal server error"})
    }
  }

module.exports = {  
    signup,
    login
}